<template>
    <section>
        <div class="card">
            <div class="card-content">
                <b-field label="Buscador Producto">
                    <b-input ref="searchProduct" placeholder="Buscador productos" type="text" expanded></b-input>
                    <p class="control">
                        <b-button type="is-info" label="Buscar"/>
                    </p>
                </b-field>
                <b-table :data="data" :columns="columns" sticky-header striped hoverable paginated per-page="10"></b-table>
            </div>
        </div>
        <div class="card">
            <div class="card-header">
                <div class="card-header-title px-5 py-4">
                    Orden de Compra del Cliente
                </div>
            </div>
            <div class="card-content">
                <b-table :data="data" :columns="columns" sticky-header striped hoverable paginated per-page="10"></b-table>
                <b-field label="Observación">
                    <b-input maxlength="200" type="textarea"></b-input>
                </b-field>
                <b-field class="has-text-centered">
                    <b-button type="is-info" label="Enviar Orden de Pedido"></b-button>
                </b-field>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    name: 'tableProduct',
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
                    label: 'Codigo',
                    width: '40',
                    numeric: true
                },
                {
                    field: 'first_name',
                    label: 'Nombre Producto',
                    width: '500',
                },
                {
                    field: 'last_name',
                    label: 'Precio',
                },
                {
                    field: 'date',
                    label: 'Dcto',
                    centered: true
                },
                {
                    field: 'gender',
                    label: 'Iva',
                },
                {
                    field: 'gender',
                    label: 'P. Neto',
                },
                {
                    field: 'gender',
                    label: 'Stock',
                },
                {
                    field: 'gender',
                    label: 'Cant.',
                }
                // {
                //     field: 'gender',
                //     label: 'Eliminar',
                // }
            ]
        }
    },
    mounted(){
        this.$refs.searchProduct.focus()
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>