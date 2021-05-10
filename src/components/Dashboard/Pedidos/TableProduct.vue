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

    <Draft :order="sendNorder"/>
  </section>
</template>
<script>
import RealDB from "@/classes/DataBase";
import Auth from "@/classes/AuthUser";
import Draft from './DraftTableProduct'
import moment from "moment";
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
    Draft
  },
  data() {
    return {
      productName: "",
      queryName: "",
      row: null,
      cantidad: 0,
      Norder: 0,
    };
  },
  async created() {
    await this.fetchProductList();
    this.getNOrderSales();
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
    async getNOrderSales() {
      let that = this;
      let db = new RealDB("KardexPedidos/");
      await db.limitLast(1)
        .once("value")
        .then((response) => {
          response.val() == null
            ? (that.Norder = 1)
            : (that.Norder = this.keyValue(response.val()) + 1);
        })
        .catch((e) => {
          Toast.error(`${e.code} - ${e.message}`);
        });
    },
    keyValue(x) {
      if (!x) return 1;
      else return parseInt(Object.keys(x));
    },
    setOrderSales(e) {
      this.saveClientInfo();
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
        document.getElementById("");

        let db = new RealDB(
          `KardexPedidos/${this.Norder}/productos/${e.target.id}`
        );
        db.update(productos).catch((e) =>
          Toast.error(`${e.code} - ${e.message}`)
        );
      }
    },
    async saveClientInfo() {
      moment.locale("es-mx");
      let clientInfo = {
        codigo: this.clientSelected.codigo,
        nombre: this.clientSelected.nombre,
        listapre: this.clientSelected.listapre,
        contacto: this.clientSelected.contacto,
        nit: this.clientSelected.nit,
        direccion: this.clientSelected.direccion,
        Norder: this.Norder,
        user: Auth.currentUser().email,
        fecha: moment().format("L"),
        hora: moment().format("LTS"),
        modificado: null,
        aplicado: false,
        estado: 'pendiente'
      };

      let db = new RealDB(`KardexPedidos/${this.Norder}`);
      await db.update(clientInfo).catch((e) =>
        Toast.error(`${e.code} - ${e.message}`)
      );
      this.sendNorder()

    },
    sendNorder(){
      return this.Norder
    }
  },
  asyncComputed: {
    ...mapState("products", ["product_list"]),
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
    }
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
