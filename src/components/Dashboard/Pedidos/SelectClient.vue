<template>
  <section>
    <b-loading is-full-page v-model="getLoading" :can-cancel="true"></b-loading>
    <div class="card">
      <header class="card-header">
        <p class="card-header-title px-5 py-4">
          Gestión de Cliente
        </p>
      </header>
      <div class="card-content">
        <b-field label="Seleccionar Cliente">
          <!-- <b-input ref="selectClient" type="text" placeholder="Ej. 123456 - Drogueria Carlos - Carlos delbarre" expanded></b-input> -->
          <b-autocomplete
            ref="selectClient"
            field="nombre"
            v-model="clientName"
            :data="filteredDataClientsList"
            expanded
            placeholder="Ej. 123456 - Drogueria Carlos - Carlos delbarre"
            clearable
            @select="(option) => (selected = option)"
          >
            <template slot="empty">No hay resultados encontrados.</template>
          </b-autocomplete>

        </b-field>
      </div>
    </div>
    <DebtClient :clientSelected="selected == null ? {} : selected" />
  </section>
</template>
<script>
import { mapState } from "vuex";
import DebtClient from "./DebtClient.vue";
export default {
  name: "selectClient",
  components: {
    DebtClient,
  },
  data() {
    return {
      clientName: "",
      selected: {},
    };
  },
  mounted() {
    this.$refs.selectClient.focus();
  },
  methods:{
    handleSelectedClient(){
      this.$emit('selectedClient', this.selected)
    }
  },
  asyncComputed: {
    ...mapState("clients", ["client_list"]),
    getLoading() {
      if (this.client_list == null){
        return true
      }else{
        return false
      }

    },
    isSelected(){
      if (Object.keys(this.selected).length !== 0){
         return this.handleSelectedClient()
      }else{
        return this.selected = {}
      }
    },
    filteredDataClientsList() {
      if (this.client_list) {
        return this.client_list.filter((option = {}) => {
          return (
            option.nombre
              .toString()
              .toLowerCase()
              .indexOf(this.clientName.toLowerCase()) >= 0
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
