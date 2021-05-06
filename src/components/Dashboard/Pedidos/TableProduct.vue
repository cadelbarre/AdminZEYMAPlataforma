<template>
  <section>
    <div class="card">
      <div class="card-content">
        <b-field label="Buscador Producto">
          <b-input ref="searchProduct" placeholder="Buscar por producto ó codigo" type="search" id="Search" v-model="queryName" expanded>
          </b-input>
        </b-field>
        <b-table
            :data="product_list == null ? [] : filteredDataProductsList"
          sticky-header
          striped
          hoverable
            :loading="isLoading"
            default-sort="nombre1"
            default-sort-direction="ASC"
        >
          <b-table-column field="codigo" label="Codigo" width="40" sortable v-slot="props">
            {{ props.row.codigo }}
          </b-table-column>
          <b-table-column field="nombre1" label="Descripción" width="200" sortable v-slot="props">
            {{ props.row.nombre1 }}
          </b-table-column>
          <b-table-column field="cuatro" label="Precio" width="40" numeric v-slot="props">
            {{ formatNumber(props.row.cuatro) }}
          </b-table-column>
          <b-table-column field="descuento" label="Dcto" width="40" numeric sortable v-slot="props">
            {{ props.row.descuento }}
          </b-table-column>
          <b-table-column field="iva" label="IVA" width="40" numeric sortable  v-slot="props">
            {{ props.row.iva }}
          </b-table-column>
          <b-table-column field="siete" label="P. Neto" width="40" numeric v-slot="props">
            {{ formatNumber(props.row.siete) }}
          </b-table-column>
          <b-table-column field="actual" label="Stock" width="40" numeric v-slot="props">
            {{ formatNumber(props.row.actual) }}
          </b-table-column>
          <b-table-column label="Cant." width="40" >
            <b-input id="cantidad"></b-input>
          </b-table-column>
          <template #empty>
            <div class="has-text-centered">
              <p class="subtitle has-text-grey-light has-text-weight-light">No records</p>
            </div>
          </template>
        </b-table>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <div class="card-header-title px-5 py-4">
          Orden de Compra del Cliente
        </div>
      </div>
      <div class="card-content">
        <b-table
            :data="[]"
            sticky-header
            striped
            hoverable
            paginated
            per-page="10"
        ></b-table>
        <b-field label="Observación">
          <b-input maxlength="200" type="textarea"></b-input>
        </b-field>

      </div>
    </div>
  </section>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "tableProduct",
  props: {
    clientSelected: {
      type: Object, // String, Number, Boolean, Function, Object, Array
      required: true,
      default: () => {},
    },
  },
  data() {
    return {
      productName: "",
      queryName: '',
      isNull: false,

    };
  },
  async mounted() {
    await this.fetchProductList();
  },
  methods: {
    ...mapActions("products", ["fetchProductList"]),
    formatNumber(x = 0) {
      return x
          .toString()
          .replace(/\D/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
  asyncComputed: {
    ...mapState("products", ["product_list"]),
    async filteredDataProductsList() {
      let name_re = new RegExp(this.queryName, "i"),
          productFiltered = [],
           i = 0;

      for (i in this.product_list) {

        if (
            this.product_list[i].nombre1.match(name_re) ||
            this.product_list[i].codigo.match(name_re)
        ) {
          productFiltered.push(this.product_list[i]);
        }
      }
      this.isNull = false
      return productFiltered;
    },
    isLoading(){
      if (!this.product_list){
        return true
      }else{
        return false
      }
    }
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
