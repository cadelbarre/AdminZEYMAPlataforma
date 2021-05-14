<template>
  <section>
    <div class="card">
      <div class="card-header">
        <div class="card-header-title px-5 py-4">
          Orden de Compra del Cliente
        </div>
      </div>
      <div class="card-content">
        <b-table
          :data="draft == null ? [] : this.draft"
          sticky-header
          striped
          hoverable
          paginated
          per-page="10"
        >
        <b-table-column
            field="item"
            label="Codigo"
            width="40"
            sortable
            v-slot="props"
          >
            {{ props.row.item }}
          </b-table-column>
          <b-table-column
            field="nombre"
            label="Descripción"
            width="40"
            sortable
            v-slot="props"
          >
            {{ props.row.nombre }}
          </b-table-column>
          <b-table-column
            field="precioValor"
            label="Precio"
            width="40"
            v-slot="props"
          >
            {{ props.row.precioValor }}
          </b-table-column>
          <b-table-column
            field="iva"
            label="Iva"
            width="40"
            v-slot="props"
          >
            {{ props.row.iva }}
          </b-table-column>
          <b-table-column
            field="descuento"
            label="Dcto"
            width="40"
            v-slot="props"
          >
            {{ props.row.descuento }}
          </b-table-column>
          <b-table-column
            field="valorTotal"
            label="P. Neto"
            width="40"
            v-slot="props"
          >
            {{ props.row.valorTotal }}
          </b-table-column>
          <b-table-column
            field="cantidad"
            label="Cant."
            width="40"
            sortable
            v-slot="props"
          >
            {{ props.row.cantidad }}
          </b-table-column>
        </b-table>
        <b-field label="Observación">
          <b-input
            maxlength="200"
            type="textarea"
            v-model="observation"
          ></b-input>
        </b-field>
      </div>
    </div>
  </section>
</template>

<script>
import RealDB from "@/classes/DataBase";
import Toast from "@/classes/Toast";
import { mapState } from "vuex";

export default {
  name: "borradorTablaProductos",
  data() {
    return {
      draft: null,
      observation: ""
    }
  },
  methods: {},
  asyncComputed: {
    ...mapState("products", ["n_order"]),
    async getDraft() {
      if (this.n_order == null || this.n_order == 0) return
      const that = this
      let db = new RealDB(`KardexPedidos/${this.n_order}`);
      try {
        await db.getInfoRealTime().on('value', res => {
          that.draft = Object.values(res.val().productos)
        })        
      } catch (e) {
        Toast.error(`${e.code} - ${e.message}`);
      }
    },
  },
};
</script>

<style></style>
