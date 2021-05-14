<template>
  <section>
    <div class="card">
      <div class="card-content">
        <b-field label="Buscador Producto">
          <b-input
            ref="searchProduct"
            placeholder="Buscar por producto ó codigo"
            type="search"
            id="Search"
            v-model="queryName"
            expanded
            autocomplete="off"
          >
          </b-input>
        </b-field>
        <!-- sticky-header
          open-on-focus -->
        <b-table
          :data="product_list == null ? [] : filteredDataProductsList"
          striped
          hoverable
          :selected.sync="row"
          paginated
          per-page="20"
          :loading="isLoading"
          default-sort="nombre1"
          default-sort-direction="ASC"
        >
          <b-table-column
            field="codigo"
            label="Codigo"
            width="40"
            sortable
            v-slot="props"
          >
            {{ props.row.codigo }}
          </b-table-column>
          <b-table-column
            field="nombre1"
            label="Descripción"
            width="200"
            sortable
            v-slot="props"
          >
            {{ props.row.nombre1 }}
          </b-table-column>
          <b-table-column label="Precio" width="40" numeric v-slot="props">
            {{ formatNumber(props.row[getPrice()]) }}
          </b-table-column>
          <b-table-column
            field="descuento"
            label="Dcto"
            width="40"
            numeric
            sortable
            v-slot="props"
          >
            {{ props.row.descuento }}
          </b-table-column>
          <b-table-column
            field="iva"
            label="IVA"
            width="40"
            numeric
            sortable
            v-slot="props"
          >
            {{ props.row.iva }}
          </b-table-column>
          <b-table-column label="P. Neto" width="40" numeric v-slot="props">
            {{
              formatNumber(
                props.row[getPrice()] *
                  ((100 + props.row.iva - props.row.descuento) / 100)
              )
            }}
          </b-table-column>
          <b-table-column
            field="actual"
            label="Stock"
            width="40"
            numeric
            v-slot="props"
          >
            {{ formatNumber(props.row.actual) }}
          </b-table-column>
          <b-table-column label="Cant." width="40" v-slot="props">
            <b-field>
              <b-input
                type="number"
                min="0"
                :id="props.row.codigo"
                @blur="setOrderSales"
              ></b-input>
            </b-field>
          </b-table-column>

          <template #empty>
            <div class="has-text-centered">
              <p class="subtitle has-text-grey-light has-text-weight-light">
                Escribe el nombre del producto que deseas ingresar
              </p>
            </div>
          </template>
        </b-table>
      </div>
    </div>

    <Draft />
  </section>
</template>
<script>
import RealDB from "@/classes/DataBase";
import Draft from "./DraftTableProduct";
import Toast from "@/classes/Toast";

import { mapActions, mapState } from "vuex";
import { formattedNumber } from "@/functions/general";

export default {
  name: "tableProduct",
  props: {
    clientSelected: {
      type: Object, // String, Number, Boolean, Function, Object, Array
      required: true,
      default: () => {},
    },
  },
  components: {
    Draft,
  },
  data() {
    return {
      productName: "",
      queryName: "",
      row: null,
      cantidad: 0,
    };
  },
  async created() {
    await this.fetchProductList();
  },
  methods: {
    ...mapActions("products", ["fetchProductList"]),
    formatNumber(x) {
      return formattedNumber(x);
    },
    getPrice() {
      let arr = ["uno", "dos", "tres", "cuatro", "cinco", "seis", "siete"];
      return arr[this.clientSelected.listapre - 1];
    },
    setOrderSales(e) {
      if (e.target.value > 0) {
        let productos = {
          item: e.target.id,
          cantidad: Number(e.target.value),
          nombre: this.row.nombre1,
          descuento: this.row.descuento,
          iva: this.row.iva,
          proveedor: this.row.proveedor,
          precio: this.getPrice(),
          precioValor: this.row[`${this.getPrice()}`],
        };

        productos["valorTotal"] =
          productos.precioValor *
          productos.cantidad *
          ((100 + productos.iva - productos.descuento) / 100);

        e.target.value = 0;

        let db = new RealDB(
          `KardexPedidos/${this.n_order}/productos/${e.target.id}`
        );

        try {
          db.update(productos);
        } catch (e) {
          Toast.error(`${e.code} - ${e.message}`);
        }
      }
    },
    sendNorder() {
      return this.Norder;
    },
  },
  asyncComputed: {
    ...mapState("products", ["product_list", "n_order"]),
    async filteredDataProductsList() {
      if (this.queryName) {
        let name_re = Object.values(this.product_list);
        return name_re.filter(
          (x) =>
            x.nombre1.toLowerCase().indexOf(this.queryName.toLowerCase()) > -1
        );
      } else {
        return [];
      }
    },
    isLoading() {
      if (!this.product_list) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
