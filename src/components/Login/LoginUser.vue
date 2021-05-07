<template>
  <section>
    <div class="box">
      <div class="has-text-centered mb-4">
        <h1 class="title mb-3">Iniciar Sesión</h1>
        <p>Bienvenido! Por favor, Ingresa tus datos para continuar</p>
      </div>
      <b-field
        label="Usuario"
        :message="error.mail"
        :type="error.mail != null ? 'is-danger' : ''"
      >
        <b-input
          ref="userLogin"
          type="email"
          placeholder="mail@mail.com"
          v-model.trim="mail"
        ></b-input>
      </b-field>
      <b-field
        label="Contraseña"
        :message="error.password"
        :type="error.password != null ? 'is-danger' : ''"
      >
        <b-input
          ref="passwordLogin"
          type="password"
          password-reveal
          placeholder="*******"
          v-model.trim="password"
        >
        </b-input>
      </b-field>
      <div class="field">
        <label>
          <router-link to="/reset-password" class="is-size-7">
            Olvidé mi contraseña
          </router-link>
        </label>
      </div>
      <div class="field has-text-centered mt-5">
        <b-button
          type="is-info"
          expanded
          label="Ingresar"
          @click="loginIt"
          :loading="isLoading"
        ></b-button>
        <hr />
        <p>
          ¿ Nuevo en el sitio ?
          <router-link to="/register" class="is-line"
            >Registrate aqui.</router-link
          >
        </p>
      </div>
    </div>
  </section>
</template>
<script>
import { mapActions } from "vuex";
import Auth from "@/classes/AuthUser";
import Toast from "@/classes/Toast";

export default {
  name: "login",
  data() {
    return {
      mail: "",
      password: "",
      isLoading: false,
      error: {
        mail: null,
        password: null,
      },
    };
  },
  mounted() {
    this.$store.commit("SET_LAYOUT", "login-layout");
    this.$refs.userLogin.focus();
  },
  methods: {
    ...mapActions("clients", ["fetchClientsList"]),
    ...mapActions("user", ["addReqAuth"]),
    async loginIt() {
      let that = this;
      that.isLoading = true;
      this.cleanVariables();

      if (this.verifyInput()) {
        if (await Auth.currentUser()) Auth.logOutSession();
        await Auth.signInUser(this.mail, this.password)
          .then(async () => await this.addReqAuth())
          .then(async () => await this.fetchClientsList())
          .then(() => (that.isLoading = false))
          .then(() => this.$router.push("/dashboard"))
          .catch((e) => {
            Toast.error(`${e.code} - ${e.message}`);
            that.isLoading = false;
          });
      }
    },
    cleanVariables() {
      this.error = {
        mail: null,
        password: null,
      };
    },
    verifyInput() {
      if (this.mail == "") {
        // this.$refs.userLogin.focus();
        this.isLoading = false;
        return (this.error.mail =
          "El campo del correo electrónico se encuentra vacio.");
      }
      if (this.password == "") {
        // this.$refs.passwordLogin.focus();
        this.isLoading = false;
        return (this.error.password =
          "El campo de la contraseña se encuentra vacio.");
      }

      return true;
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.title {
  margin-bottom: 0.1rem;
}
</style>
