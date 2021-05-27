<template>
    <section>
        <div class="card">
            <div class="card-header">
                <div class="card-header-title px-5 py-4">
                    Orden de Compra del Cliente
                </div>
            </div>
            <div class="card-content">
                <b-table :data="draft == null ? [] : this.draft" striped hoverable paginated per-page="10" :selected.sync="rowProducto">
                    <b-table-column field="item" label="Codigo" width="40" sortable v-slot="props">
                        {{ props.row.item }}
                    </b-table-column>
                    <b-table-column field="nombre" label="Descripción" width="40" sortable v-slot="props">
                        {{ props.row.nombre }}
                    </b-table-column>
                    <b-table-column field="precioValor" label="Precio" width="40" v-slot="props">
                        {{ formatNumber(props.row.precioValor) }}
                    </b-table-column>
                    <b-table-column field="iva" label="Iva" width="40" v-slot="props">
                        {{ props.row.iva }}
                    </b-table-column>
                    <b-table-column field="descuento" label="Dcto" width="40" v-slot="props">
                        {{ props.row.descuento }}
                    </b-table-column>
                    <b-table-column field="valorTotal" label="P. Neto" width="40" v-slot="props">
                        {{ formatNumber(props.row.valorTotal) }}
                    </b-table-column>
                    <b-table-column field="cantidad" label="Cant." width="40" sortable v-slot="props">
                        {{ props.row.cantidad }}
                    </b-table-column>
                    <b-table-column width="100" label="Acciones" centered>
                        <div class="buttons">
                            <b-tooltip label="Borrar Pedido" position="is-left" type="is-danger is-light">
                                <b-button type="is-danger" icon-left="delete" @click="borrarProducto" />
                            </b-tooltip>
                            <b-tooltip label="Editar Pedido" position="is-right" type="is-dark">
                                <b-button type="is-info" icon-left="square-edit-outline" />
                            </b-tooltip>
                        </div>
                    </b-table-column>
                </b-table>
                <b-field label="Observación">
                    <b-input maxlength="200" type="textarea" v-model="observation" @blur="guardarObservacion"></b-input>
                </b-field>
            </div>
        </div>
    </section>
</template>
<script>
import RealDB from "@/classes/DataBase";
import Toast from "@/classes/Toast";
import { mapState } from "vuex";
import { formattedNumber } from "@/functions/general";

export default {
    name: "borradorTablaProductos",
    data() {
        return {
            draft: null,
            observation: "",
            rowProducto: null,
        }
    },
    methods: {
        formatNumber( x ) {
            return formattedNumber( x );
        },
        borrarProducto() {
            setTimeout( () => {
                const { item } = this.rowProducto
                const Norder = this.n_order
                const db = new RealDB( `KardexPedidos/${Norder}/productos/${item}` )
                try {
                    db.remove()
                } catch ( e ) {
                    Toast.error( e );
                }
            }, 300 )
        },
        async guardarObservacion() {
            const Norder = this.n_order
            const obs = { observacion: [this.observation] }
            let db = new RealDB(
                `KardexPedidos/${Norder}`
            );

            try {
                await db.update( obs );
            } catch ( e ) {
                Toast.error( e );
            }
        }
    },
    asyncComputed: {
        ...mapState( "products", [ "n_order" ] ),
        async getDraft() {
            if ( this.n_order == null || this.n_order == 0 ) return
            const that = this
            let db = new RealDB( `KardexPedidos/${this.n_order}` );
            try {
                await db.getInfoRealTime().on( 'value', res => {
                    const productos = res.val().productos
                    if ( productos !== undefined ) that.draft = Object.values( productos )
                } )
            } catch ( e ) {
                Toast.error( e );
            }
        },
    },
};
</script>
<style scope lang="scss">
.buttons {
    justify-content: center !important;

    .button {
        margin-right: 0.3em;
    }
}

.button {
    padding: 1.2em !important;
}
</style>