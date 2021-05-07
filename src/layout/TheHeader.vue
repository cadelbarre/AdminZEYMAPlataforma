<template>
  <b-navbar class="has-background-white" centered>
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img
          src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
          alt="Lightweight UI components for Vue.js based on Bulma"
        />
      </b-navbar-item>
    </template>
    <template #start centered>
      <b-navbar-dropdown label="Pedidos" hoverable>
        <b-navbar-item tag="router-link" :to="{ path: '/dashboard' }">
          Agregar Pedido
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/pedidosBorrador' }">
          Pedidos Borrador
        </b-navbar-item>
        <hr />
        <b-navbar-item tag="router-link" :to="{ path: '/administrarPedidos' }">
          Administrar Pedidos
        </b-navbar-item>
      </b-navbar-dropdown>
      <b-navbar-dropdown label="Cartera" hoverable>
        <b-navbar-item tag="router-link" :to="{ path: '/Cartera' }">
          Cartera Cliente
        </b-navbar-item>
      </b-navbar-dropdown>
      <b-navbar-dropdown label="Informes" hoverable>
        <b-navbar-item href="#">
          Informe Venta
        </b-navbar-item>
        <b-navbar-item href="#">
          Informe Cartera
        </b-navbar-item>
      </b-navbar-dropdown>
    </template>
    <template #end>
      <b-image
        :src="require('@/static/avatar_general.png')"
        alt="The Buefy Logo"
        rounded
        class="is-48x48"
      ></b-image>
      <b-button label="LogOut" @click="logOutSession()"></b-button>
    </template>
    <SideBar />
  </b-navbar>
</template>
<script>
import Auth from "@/classes/AuthUser";
import SideBar from "@/components/Setting/SideBar.vue";
import { mapActions } from "vuex";

export default {
  name: "TheHeader",
  components: {
    SideBar,
  },
  methods: {
    ...mapActions("user", ["removeReqAuth"]),
    logOutSession() {
      Auth.logOutSession()
        .then(() => {
          this.removeReqAuth();
          this.$router.push("/");
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$body: #001737;
$text: rgba(122, 122, 122, 0.2);

nav {
  border-bottom: 1px solid $text !important;
}
</style>
