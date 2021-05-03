<template>
    <section>
        <h1 class="subtitle is-uppercase is-size-6 has-text-weight-medium ml-1">Estado de Cuenta Cliente</h1>
        <div class="card">
            <header class="card-header">
                <p class="card-header-title px-5 py-4">
                    Informe Cartera
                </p>
            </header>
            <div class="card-content">
                <b-field label="Seleccionar Cliente">
                    <b-autocomplete ref="selectClientDebt" field="nombre" v-model="clientName" :data="filteredDataClientsList" expanded placeholder="Ej. 123456 - Drogueria Carlos - Carlos delbarre" clearable @select="(option) => (selected = option)
                    ">
                        <template slot="empty">No hay resultados encontrados.</template>
                    </b-autocomplete>
                    <!-- <b-input type="text" placeholder="Ej. 123456 - Drogueria Carlos - Carlos delbarre" expanded></b-input> -->
                    <p class="control">
                        <b-button type="is-info" label="Buscar" />
                    </p>
                </b-field>
                <b-table :data="data" :columns="columns" sticky-header striped hoverable paginated per-page="10"></b-table>
            </div>
        </div>
    </section>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'indexCartera',
    data() {
        return {
            clientName: '',
            selected: null,
            data: [
                { 'id': 1, 'first_name': 'Jesse', 'last_name': 'Simmons', 'date': '2016-10-15 13:43:27', 'gender': 'Male' },
                { 'id': 2, 'first_name': 'John', 'last_name': 'Jacobs', 'date': '2016-12-15 06:00:53', 'gender': 'Male' },
                { 'id': 3, 'first_name': 'Tina', 'last_name': 'Gilbert', 'date': '2016-04-26 06:26:28', 'gender': 'Female' },
                { 'id': 4, 'first_name': 'Clarence', 'last_name': 'Flores', 'date': '2016-04-10 10:28:46', 'gender': 'Male' },
                { 'id': 5, 'first_name': 'Anne', 'last_name': 'Lee', 'date': '2016-12-06 14:38:38', 'gender': 'Female' },
                { 'id': 6, 'first_name': 'Anne', 'last_name': 'Lee', 'date': '2016-12-06 14:38:38', 'gender': 'Female' },
                { 'id': 7, 'first_name': 'Anne', 'last_name': 'Lee', 'date': '2016-12-06 14:38:38', 'gender': 'Female' },
                { 'id': 8, 'first_name': 'Anne', 'last_name': 'Lee', 'date': '2016-12-06 14:38:38', 'gender': 'Female' },
                { 'id': 9, 'first_name': 'Anne', 'last_name': 'Lee', 'date': '2016-12-06 14:38:38', 'gender': 'Female' },
                { 'id': 10, 'first_name': 'Anne', 'last_name': 'Lee', 'date': '2016-12-06 14:38:38', 'gender': 'Female' },
                { 'id': 11, 'first_name': 'Anne', 'last_name': 'Lee', 'date': '2016-12-06 14:38:38', 'gender': 'Female' },
                { 'id': 12, 'first_name': 'Anne', 'last_name': 'Lee', 'date': '2016-12-06 14:38:38', 'gender': 'Female' },
                { 'id': 13, 'first_name': 'Anne', 'last_name': 'Lee', 'date': '2016-12-06 14:38:38', 'gender': 'Female' },
                { 'id': 14, 'first_name': 'Anne', 'last_name': 'Lee', 'date': '2016-12-06 14:38:38', 'gender': 'Female' },
                { 'id': 15, 'first_name': 'Anne', 'last_name': 'Lee', 'date': '2016-12-06 14:38:38', 'gender': 'Female' }
            ],
            columns: [{
                    field: 'id',
                    label: 'Tipo',
                    width: '80',
                    numeric: true
                },
                {
                    field: 'first_name',
                    label: 'Factura',
                    width: '80',
                },
                {
                    field: 'last_name',
                    label: 'Fecha Venc',
                },
                {
                    field: 'date',
                    label: 'Plazo',
                    centered: true
                },
                {
                    field: 'date',
                    label: 'Dias Venc.',
                    centered: true
                },
                {
                    field: 'gender',
                    label: 'Nombre Cliente',
                    width: '500'
                },
                {
                    field: 'gender',
                    label: 'IVA',
                },
                {
                    field: 'gender',
                    label: 'Valor Factura',
                    width: '100'
                },
                {
                    field: 'gender',
                    label: 'Abono',
                },
                {
                    field: 'gender',
                    label: 'Saldo',
                }

            ]
        }
    },
    mounted(){
        this.$refs.selectClientDebt.focus()
    },
    asyncComputed: {
        ...mapState('clients', ['client_list']),
        async filteredDataClientsList() {
            return await this.client_list.filter((option) => {
                return (
                    option.nombre
                    .toString()
                    .toLowerCase()
                    .indexOf(this.clientName.toLowerCase()) >= 0
                );
            });
        },

    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>