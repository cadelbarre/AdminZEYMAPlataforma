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
            <b-input ref="resetPass" placeholder="Ingrese su correo electrónico." expanded></b-input>
            <p class="control">
                <b-button label="Restaurar Contraseña" type="is-info" expanded></b-button>
            </p>
        </b-field>
        <hr>
        <p class="has-text-centered mb-5">
            ¿ Estas listo para iniciar sesión ? Entonces, <router-link to="/">vamos alla</router-link>
        </p>

    </div>
</template>
<script>
export default {
    name: 'resetPassword',
    mounted() {
        this.$refs.resetPass.focus()
    },
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