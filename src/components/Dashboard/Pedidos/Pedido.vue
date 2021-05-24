<template>
  <section>
    <BreadCrumb title="Agregar Pedidos" />

    <b-tabs type="is-boxed" class="has-shadow">
      <b-tab-item label="Cliente">
        <SelectClient @selectedClient="infoSelected" />
      </b-tab-item>
      <b-tab-item label="Orden Pedido">
        <TableProduct :clientSelected="selected == null ? {} : selected" />
      </b-tab-item>
    </b-tabs>
    <b-tag rounded type="is-dark" size="is-large" id="total"
      >Total Pedido: $ {{formatNumber(total)}}</b-tag
    >
  </section>
</template>
<script>
import BreadCrumb from "../../breadCrumb.vue";
import SelectClient from "./PedidoSelectClient.vue";
import TableProduct from "./PedidoTableProduct.vue";
import RealDB from "@/classes/DataBase";
import { formattedNumber } from "@/functions/general";
import {mapState} from 'vuex'

export default {
  name: "agregarPedido",
  components: {
    BreadCrumb,
    SelectClient,
    TableProduct,
  },
  data() {
    return {
      selected: null,
      total: 0
    };
  },
  methods: {
    infoSelected(info) {
      this.selected = info;
    },
    formatNumber(x = 0) {
      return formattedNumber(x);
    },
  },
  asyncComputed:{
     ...mapState("products", ["n_order"]),
     async getTotal(){
      const db = new RealDB(`KardexPedidos/${this.n_order}/productos`)
      try{
        await db.getInfoRealTime().on('value', res => {
          if (res.val() == null ) return this.total = 0
            const totalSales = Object.values(res.val());
            return this.total = totalSales.reduce((acc, el) => (acc += el.valorTotal), 0);
        })
      }catch(e){
        console.error(e);
      }
     }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.tag {
  // position: -webkit-fixed !important;
  position: fixed !important;
  bottom: 20px !important;
  right: 0;
  left: 0;
  margin-right: auto;
  margin-left: auto;

  max-width: 500px;
}
</style>
