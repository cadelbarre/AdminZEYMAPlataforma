<template>
    <section>
        <b-modal v-model="ShowModal" full-screen>
            <div class="card">
                <div class="card-content">
                    <div class="columns">
                        <div class="column is-4 is-offset-8">
                            <p><strong>NÚMERO DEL PEDIDO: <span class="is-size-4">{{pedido.Norder}}</span></strong></p>
                        </div>
                    </div>
                    <div class="columns is-centered">
                        <div class="column is-6">
                            <p><strong>Cliente: </strong> {{ lower(pedido.nombre)}}</p>
                            <p><strong>Nit: </strong> {{lower(pedido.nit)}}</p>
                            <p><strong>Contacto: </strong> {{lower(pedido.contacto)}}</p>
                            <p><strong>Dirección: </strong> {{lower(pedido.direccion)}}</p>
                        </div>
                        <div class="column is-4">
                            <strong>Fecha: </strong> {{pedido.fecha}}
                            <strong>Hora: </strong> {{pedido.hora}}
                            <p><strong>Usuario: </strong> {{pedido.user}}</p>
                            <strong>Observaciones:</strong> <br> {{pedido.observacion}}
                        </div>
                    </div>
                    <div class="buttons has-text-centered">
                        <b-button type="is-info" icon-left="printer" label="Imprimir" @click="imprimir" />
                        <b-button label="Cerrar" @click="$emit('close')"/>
                    </div>
                </div>
                <div class="card-content">
                    <b-table :data="mostrarProductos" striped hoverable default-sort="nombre" default-sort-direction="ASC">
                        <b-table-column field="item" label="Codigo" width="40" centered sortable v-slot="props">
                            {{ props.row.item }}
                        </b-table-column>
                        <b-table-column field="nombre" label="Descripción Productos" width="40" sortable v-slot="props">
                            {{ props.row.nombre }}
                        </b-table-column>
                        <b-table-column field="cantidad" label="Cant" width="40" sortable centered v-slot="props">
                            {{ props.row.cantidad }}
                        </b-table-column>
                        <b-table-column field="precioValor" label="P. Bruto" width="40" sortable v-slot="props">
                            {{ formatNumber(props.row.precioValor) }}
                        </b-table-column>
                        <b-table-column field="descuento" label="Descuento" width="40" sortable v-slot="props">
                            {{ props.row.descuento }}
                        </b-table-column>
                        <b-table-column field="iva" label="IVA" width="40" sortable v-slot="props">
                            {{ props.row.iva }}
                        </b-table-column>
                        <b-table-column field="valorTotal" label="V. Neto" width="40" v-slot="props">
                            {{ formatNumber(props.row.valorTotal) }}
                        </b-table-column>
                        <template #empty>
                            <div class="has-text-centered">
                                <p class="subtitle has-text-grey-light has-text-weight-light">
                                    El cliente no tiene ningún producto registrado.
                                </p>
                            </div>
                        </template>
                    </b-table>
                </div>
            </div>
        </b-modal>
    </section>
</template>
<script>
import { formattedNumber } from "@/functions/general";
import _ from 'lodash/string'
export default {
    name: 'ModalDespacho',
    props: {
        isModalActive: {
            type: Boolean, // String, Number, Boolean, Function, Object, Array
            required: true,
            default: false
        },
        pedido: {
            type: Object, // String, Number, Boolean, Function, Object, Array
            required: true,
            default: () => {}
        }
    },
    data() {
        return {
            productos: []
        }
    },
    methods: {
        formatNumber( x = 0 ) {
            return formattedNumber( x )
        },
        lower( x ) {
            return _.upperFirst( _.toLower( x ) )
        },
        imprimir() {
            window.print()
        }
    },
    computed: {
        mostrarProductos() {
            const { productos } = this.pedido
            if ( productos == undefined ) return []
            return Object.values( this.pedido.productos )
        },
        ShowModal: {
            get() {
                return this.isModalActive
            },
            set( value ) {
                this.$emit( "close", value );
            }
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
div.modal.is-active {
    div.animation-content.modal-content {
        max-width: 1200px;
        position: absolute;
        top: 0;
    }
}
</style>