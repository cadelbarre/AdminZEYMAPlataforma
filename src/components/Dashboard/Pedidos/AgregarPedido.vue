<template>
    <section>
        <BreadCrumb title="Agregar Pedidos" />
        
        <b-tabs type="is-boxed" class="has-shadow">
            <b-tab-item label="Cliente">
                <SelectClient />
                
            </b-tab-item>
            <b-tab-item label="Orden Pedido">
                <TableProduct />
            </b-tab-item>
        </b-tabs>
        <b-tag rounded type="is-dark" size="is-large">Total Pedido: $ 498.524</b-tag>
    </section>
</template>
<script>
import BreadCrumb from '../../breadCrumb.vue'
import SelectClient from './SelectClient.vue'
import TableProduct from './TableProduct.vue'

export default {
    name: 'agregarPedido',
    components: {
        BreadCrumb,
        SelectClient,
        TableProduct,
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.tag {
    position: -webkit-fixed !important;
    position: fixed !important;
    bottom: 20px !important;
    right: 0;
    left: 0;
    margin-right: auto;
    margin-left: auto;

    max-width: 500px;
}
</style>