<template>
  <section>
    <div class="card">
      <div class="card-content">
        <b-field label="Buscador Producto">
          <b-autocomplete
            ref="searchProduct"
            field="nombre"
            v-model="productName"
            :data="filteredDataProductsList"
            expanded
            placeholder="Buscador productos"
            clearable
            @select="(option) => (selected = option)"
          >
            <template slot="empty">No hay resultados encontrados.</template>
          </b-autocomplete>
          <p class="control">
            <b-button type="is-info" label="Buscar" />
          </p>
        </b-field>
        <b-table
          :data="dataProductList"
          :columns="columns"
          sticky-header
          striped
          hoverable
          paginated
          per-page="10"
        ></b-table>
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
          :data="dataProductList"
          :columns="columns"
          sticky-header
          striped
          hoverable
          paginated
          per-page="10"
        ></b-table>
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
import { mapActions, mapState } from "vuex";
export default {
  name: "tableProduct",
  data() {
    return {
      productName: "",
      dataProductList: [],
      columns: [
        {
          field: "id",
          label: "Codigo",
          width: "40",
          numeric: true,
        },
        {
          field: "first_name",
          label: "Nombre Producto",
          width: "500",
        },
        {
          field: "last_name",
          label: "Precio",
        },
        {
          field: "date",
          label: "Dcto",
          centered: true,
        },
        {
          field: "gender",
          label: "Iva",
        },
        {
          field: "gender",
          label: "P. Neto",
        },
        {
          field: "gender",
          label: "Stock",
        },
        {
          field: "gender",
          label: "Cant.",
        },
        // {
        //     field: 'gender',
        //     label: 'Eliminar',
        // }
      ],
    };
  },
  mounted() {
    this.$refs.searchProduct.focus();
    this.fetchProductList();
  },
  methods: {
    ...mapActions("products", ["fetchProductList"]),
  },
  asyncComputed: {
    ...mapState("products", ["product_list"]),
    async filteredDataProductsList() {
      if (this.product_list) {
        return await this.product_list.filter((option = {}) => {
          return (
            option.nombre1
              .toString()
              .toLowerCase()
              .indexOf(this.productName.toLowerCase()) >= 0
          );
        });
      } else {
        return [];
      }
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
