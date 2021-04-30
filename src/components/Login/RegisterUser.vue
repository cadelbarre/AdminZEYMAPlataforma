<template>
    <div class="box">
        <div class="has-text-centered mb-4">
            <h1 class="title mb-3">Solicitud de Registro</h1>
            <p>Registarse solo le tomará unos minutos</p>
        </div>
        <!-- Este es un input de busqueda -->
        <b-field label="Nit">
            <b-input ref="nitCustomer" type="text" placeholder="Ej. 900123456"></b-input>
        </b-field>
        <b-field label="Nombre Establecimiento">
            <b-input type="text" placeholder="Ej. Drogueria Nicolas N3"></b-input>
        </b-field>
        <b-field grouped>
            <b-field label="Nombres" expanded>
                <b-input type="text" placeholder="Ingrese nombres completos"></b-input>
            </b-field>
            <b-field label="Apellidos" expanded>
                <b-input type="text" placeholder="Ingrese apellidos completos"></b-input>
            </b-field>
        </b-field>
        <b-field label="Email">
            <b-input type="Email" placeholder="Ingrese su email. Ej: mail@mail.com"></b-input>
        </b-field>
        <b-field label="Teléfono">
            <b-input type="text" placeholder="Ej. 123 4567"></b-input>
        </b-field>
        <div class="field has-text-centered mt-5">
            <b-button type="is-info" expanded label="Enviar Resgistro"></b-button>
        </div>
        <hr>
        <p class="has-text-centered">
            ¿ Ya poseé una cuenta ?
            <router-link to="/" class="is-line">Inicie Sesión</router-link>
        </p>
    </div>
</template>
<script>
export default {
    name: 'register',
    mounted() {
        this.$refs.nitCustomer.focus()
    },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.title {
    margin-bottom: 0.1rem;
}
</style>