<template>
    <section>
        <b-modal v-model="ShowModal">
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title px-5 py-4">Listado Productos</p>
                </header>
                <div class="card-content">
                    <b-table :data="productos == null ? [] : productos" striped hoverable paginated per-page="10" default-sort="nombre" default-sort-direction="ASC">
                        <b-table-column field="item" label="Codigo" width="40" centered sortable v-slot="props">
                            {{ props.row.item }}
                        </b-table-column>
                        <b-table-column field="nombre" label="Descripción Productos" width="40" sortable v-slot="props">
                            {{ props.row.nombre }}
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
                        <b-table-column field="cantidad" label="Cant" width="40" sortable v-slot="props">
                            {{ props.row.cantidad }}
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
export default {
    name: 'ModalProductos',
    props: {
        isModalActive: {
            type: Boolean, // String, Number, Boolean, Function, Object, Array
            required: true,
            default: false
        },
        productos: {
            type: Array, // String, Number, Boolean, Function, Object, Array
            required: true,
            default: () => []
        }
    },
    methods: {
      formatNumber (x = 0) {
        return formattedNumber(x)
      }
    },
    computed: {
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
</style>