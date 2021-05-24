<template>
    <section>
        <h1 class="subtitle is-uppercase is-size-6 has-text-weight-medium ml-1">
            Borrador Pedidos
        </h1>
        <div class="card">
            <header class="card-header">
                <p class="card-header-title px-5 py-4">Borrador de Pedidos</p>
            </header>
            <div class="card-content">
                <b-field label="Buscador" message="Puede buscar por nombre del cliente, usuario ó por número de pedido.">
                    <b-input ref="draftInput" placeholder="Puede buscar por nombre del cliente, usuario ó por número de pedido." type="text"></b-input>
                </b-field>
                <b-table :data="pendingOrder == null ? [] : pendingOrder" striped hoverable paginated per-page="20" default-sort="Norder" default-sort-direction="DESC">
                    <b-table-column field="Norder" label="Pedido" width="40" centered sortable v-slot="props">
                        {{ props.row.Norder }}
                    </b-table-column>
                    <b-table-column field="codigo" label="Nit" width="40" sortable v-slot="props">
                        {{ props.row.codigo }}
                    </b-table-column>
                    <b-table-column field="nombre" label="Establecimiento" width="40" sortable v-slot="props">
                        {{ props.row.nombre }}
                    </b-table-column>
                    <b-table-column field="fecha" label="Fecha" width="40" sortable v-slot="props">
                        {{ props.row.fecha }}
                    </b-table-column>
                    <b-table-column field="hora" label="Hora" width="40" sortable v-slot="props">
                        {{ props.row.hora }}
                    </b-table-column>
                    <b-table-column field="user" label="Usuario" width="40" v-slot="props">
                        {{ props.row.user }}
                    </b-table-column>
                    <b-table-column label="Valor Ped." width="40" numeric v-slot="props">
                        $ {{ getTotalSales(props.row.productos) }}
                    </b-table-column>
                    <b-table-column width="100" label="Acciones" centered>
                        <div class="buttons">
                            <b-tooltip label="Borrar Pedido" position="is-left" type="is-danger is-light">
                                <b-button type="is-danger" icon-left="delete" />
                            </b-tooltip>
                            <b-tooltip label="Editar Pedido" position="is-right" type="is-dark">
                                <b-button type="is-info" icon-left="square-edit-outline" />
                            </b-tooltip>
                        </div>
                    </b-table-column>
                </b-table>
            </div>
        </div>
    </section>
</template>
<script>
import Toast from "@/classes/Toast";
import { formattedNumber } from "@/functions/general";
import RealDB from "@/classes/DataBase";
export default {
    name: "darftPurchase",
    data() {
        return {
            pendingOrder: null,
        };
    },
    mounted() {
        this.$refs.draftInput.focus();
        this.getPendingOrder();
    },
    methods: {
        async getPendingOrder() {
            const db = new RealDB("KardexPedidos");
            try {
                await db
                    .orderByEqual("aplicado", false)
                    .then((res) => res.val())
                    .then((res) => (this.pendingOrder = res));
            } catch (e) {
                Toast.error(`${e.code} - ${e.message}`);
            }
        },
        getTotalSales(x = []) {
            const totalSales = Object.values(x);
            const accum = totalSales.reduce((acc, el) => (acc += el.valorTotal), 0);
            return formattedNumber(accum);
        },
    },
    asyncComputed: {},
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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