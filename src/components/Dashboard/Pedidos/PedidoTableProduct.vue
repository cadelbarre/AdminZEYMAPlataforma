<template>
    <section>
        <div class="card">
            <div class="card-content">
                <b-field label="Buscador Producto">
                    <b-input ref="searchProduct" placeholder="Buscar por producto ó codigo" type="search" id="Search" v-model="queryName" expanded autocomplete="off">
                    </b-input>
                </b-field>
                <b-table :data="product_list == null ? [] : filteredDataProductsList" striped hoverable sticky-header height='350' :selected.sync="row" paginated per-page="20" :loading="isLoading" default-sort="nombre1" default-sort-direction="ASC">
                    <b-table-column field="codigo" label="Codigo" width="40" sortable v-slot="props">
                        {{ props.row.codigo }}
                    </b-table-column>
                    <b-table-column field="nombre1" label="Descripción" width="200" sortable v-slot="props">
                        {{ props.row.nombre1 }}
                    </b-table-column>
                    <b-table-column label="Precio" width="40" numeric v-slot="props">
                        {{ formatNumber(props.row[getPrice()]) }}
                    </b-table-column>
                    <b-table-column field="descuento" label="Dcto" width="40" numeric sortable v-slot="props">
                        {{ props.row.descuento }}
                    </b-table-column>
                    <b-table-column field="iva" label="IVA" width="40" numeric sortable v-slot="props">
                        {{ props.row.iva }}
                    </b-table-column>
                    <b-table-column label="P. Neto" width="40" numeric v-slot="props">
                        {{
                        formatNumber(
                        props.row[getPrice()] *
                        ((100 + props.row.iva - props.row.descuento) / 100)
                        )
                        }}
                    </b-table-column>
                    <b-table-column field="actual" label="Stock" width="40" numeric v-slot="props">
                        {{ formatNumber(props.row.actual) }}
                    </b-table-column>
                    <b-table-column label="Cant." width="40" v-slot="props">
                        <b-field>
                            <b-input type="number" min="0" :id="props.row.codigo" @blur="setOrderSales"></b-input>
                        </b-field>
                    </b-table-column>
                    <template #empty>
                        <div class="has-text-centered">
                            <p class="subtitle has-text-grey-light has-text-weight-light">
                                Escribe el nombre del producto que deseas ingresar
                            </p>
                        </div>
                    </template>
                </b-table>
            </div>
        </div>
        <Draft />
    </section>
</template>
<script>
import RealDB from "@/classes/DataBase";
import Draft from "./PedidoTableProductDraftTable.vue";
import Toast from "@/classes/Toast";

import { mapActions, mapState } from "vuex";
import { formattedNumber } from "@/functions/general";

export default {
    name: "tableProduct",
    props: {
        clientSelected: {
            type: Object, // String, Number, Boolean, Function, Object, Array
            required: true,
            default: () => {},
        },
    },
    components: {
        Draft,
    },
    data() {
        return {
            productName: "",
            queryName: "",
            row: null,
            cantidad: 0,
        };
    },
    async created() {
        await this.fetchProductList();
    },
    methods: {
        ...mapActions( "products", [ "fetchProductList" ] ),
        formatNumber( x = 0 ) {
            return formattedNumber( x );
        },
        async setOrderSales( e ) {
            if ( e.target.value > 0 ) {
                const product = await this.getItemProducto( e.target.id )
                const item = product.val()

                if ( !this.isCorrectCantidad( e.target.value, item.actual ) ) {
                    e.target.value = 0
                    return
                }

                let productos = {
                    item: e.target.id,
                    cantidad: Number( e.target.value ),
                    nombre: item.nombre1,
                    descuento: item.descuento,
                    iva: item.iva,
                    proveedor: item.proveedor,
                    precio: this.getPrice(),
                    precioValor: item[ `${this.getPrice()}` ],
                };

                productos[ "valorTotal" ] =
                    productos.precioValor *
                    productos.cantidad *
                    ( ( 100 + productos.iva - productos.descuento ) / 100 );

                e.target.value = "";

                const Norder = this.n_order
                let db = new RealDB(
                    `KardexPedidos/${Norder}/productos/${e.target.id}`
                );

                try {
                    await db.update( productos );
                } catch ( e ) {
                    Toast.error( e );
                }
            }
        },
        isCorrectCantidad( cant, stock ) {
            if ( stock - cant < 0 ) {
                this.$buefy.dialog.alert( {
                    title: 'Error',
                    message: 'La cantidad solicitada es superior al inventario disponible. ',
                    type: 'is-danger',
                    hasIcon: true,
                    icon: 'alert-circle',
                    ariaRole: 'alertdialog',
                    ariaModal: true
                } )
                return false
            } else return true
        },
        async getItemProducto( value ) {
            let db = new RealDB(
                `ListaProductos/${value}`
            );

            try {
                return await db.getInfo();
            } catch ( e ) {
                return Toast.error( e );
            }
        },
        getPrice() {
            let arr = [ "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete" ];
            return arr[ this.clientSelected.listapre - 1 ];
        },
        sendNorder() {
            return this.Norder;
        },
    },
    computed: {
        ...mapState( "products", [ "product_list", "n_order" ] ),
        filteredDataProductsList() {
            if ( this.queryName ) {
                let name_re = Object.values( this.product_list );
                return name_re.filter(
                    ( x ) => {
                        return (
                            x.nombre1.toLowerCase()
                            .indexOf( this.queryName.toLowerCase() ) > -1 || 
                            x.codigo.toLowerCase()
                            .indexOf( this.queryName.toLowerCase() ) >= 0
                        )
                    }
                );
            } else {
                return [];
            }
        },
        isLoading() {
            if ( !this.product_list ) {
                return true;
            } else {
                return false;
            }
        },
    },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.dialog .modal-card .modal-card-foot .button {
    //display: inline-flex !important;
}
</style>