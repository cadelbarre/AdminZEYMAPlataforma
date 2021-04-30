<template>
    <section>
        <h1 class="subtitle is-uppercase is-size-6 has-text-weight-medium ml-1">Borrador Pedidos</h1>
        <div class="card">
            <header class="card-header">
                <p class="card-header-title px-5 py-4">
                    Borrador de Pedidos
                </p>
            </header>
            <div class="card-content">
                <b-field label="Buscador" message="Puede buscar por nombre del cliente, usuario ó por número de pedido.">
                    <b-input ref="draftInput" placeholder="Puede buscar por nombre del cliente, usuario ó por número de pedido." type="text"></b-input>
                </b-field>
                <b-table :data="data" :columns="columns" sticky-header striped hoverable paginated per-page="10"></b-table>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    name: 'darftPurchase',
    data() {
        return {
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
                    label: 'N. Ped',
                    width: '80',
                    numeric: true
                },
                {
                    field: 'first_name',
                    label: 'Nombre Cliente',
                    width: '500',
                },
                {
                    field: 'date',
                    label: 'Fecha',
                },
                {
                    field: 'first_name',
                    label: 'Usuario',
                },
                {
                    field: 'last_name',
                    label: 'Nombre Usuario',
                },
                {
                    field: 'gender',
                    label: 'Acciones',
                }

            ]
        }
    },
    mounted() {
        this.$refs.draftInput.focus();
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>