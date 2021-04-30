<template>
    <div>
        <b-image :src="require('@/static/reset-password.webp')" ratio="3by2">
            <template>
                <b-skeleton class="skeleton-placeholder" height="100%"></b-skeleton>
            </template>
        </b-image>
        <h1 class="title has-text-centered">Recuperar Contraseña</h1>
        <p class="has-text-justified mb-5">
            Ingrese su dirección de correo electrónico y le enviaremos un enlace para restablecer su contraseña.
        </p>
        <b-field grouped group-multiline position="is-centered">
            <b-input ref="resetPass" placeholder="Ingrese su correo electrónico." expanded v-model="email" :type="email != null ? 'is-danger' : ''"></b-input>
            <p class="control">
                <b-button label="Restaurar Contraseña" type="is-info" expanded @click="recoveryPassword(email)"></b-button>
            </p>
        </b-field>
        <hr>
        <p class="has-text-centered mb-5">
            ¿ Estas listo para iniciar sesión ? Entonces, <router-link to="/">vamos alla</router-link>
        </p>
    </div>
</template>
<script>
import Auth from "@/classes/AuthUser";
import Toast from "@/classes/Toast";

export default {
    name: 'resetPassword',
    data() {
        return {
            email: null
        }
    },
    mounted() {
        this.$refs.resetPass.focus()
    },
    methods: {
        recoveryPassword(email) {
            Auth.recoveryPassword(email).then((response)=>{
                Toast.success(`Se envió un correo electrónico de restablecimiento de contraseña.`)
            }).catch((e)=>{
                Toast.error(`${e.code} - ${e.message}`)
            })
        }
    }

}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
/deep/ .b-skeleton {
    height: 100%;
    position: absolute;
    top: 0;
}
</style>