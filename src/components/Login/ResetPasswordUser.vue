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
            <b-input type="email" ref="resetPass" placeholder="Ingrese su correo electrónico." expanded v-model="email"></b-input>
            <p class="control">
                <b-button label="Restaurar Contraseña" type="is-info" expanded @click="recoveryPassword(email)" :loading="isLoading"></b-button>
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
import { SnackbarProgrammatic as Snackbar } from 'buefy'

export default {
    name: 'resetPassword',
    data() {
        return {
            email: null,
            isLoading: false
        }
    },
    mounted() {
        this.$refs.resetPass.focus()
    },
    methods: {
        async recoveryPassword( email ) {
            let that = this
            that.isLoading = true
            if ( email ) {
                await Auth.recoveryPassword( email ).then( function() {
                    console.log( 'this' );
                    Snackbar.open( {
                        message: 'Se envió un correo electrónico para reestablecer su contraseña.',
                        position: 'is-top'
                    } )
                    that.email = null
                    that.isLoading = false
                } ).catch( function( e ) {
                    Toast.error( `${e.code} - ${e.message}` )
                    that.isLoading = false
                    that.$refs.resetPass.focus()
                } )
            } else {
                Toast.error( `Debe ingresar un correo electrónico valido.` )
            }
        }
    }

}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
/deep/ .b-skeleton {
    height: 100%;
    // background-color: #ffffff;
    position: absolute;
    top: 0;
}
</style>