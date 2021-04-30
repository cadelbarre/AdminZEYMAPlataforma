<template>
    <section>
        <div class="card">
            <header class="card-header">
                <p class="card-header-title px-5 py-4">
                    Gestión de Cliente
                </p>
            </header>
            <div class="card-content">
                <b-field label="Seleccionar Cliente">
                    <b-input ref="selectClient" type="text" placeholder="Ej. 123456 - Drogueria Carlos - Carlos delbarre" expanded></b-input>
                    <p class="control">
                        <b-button type="is-info" label="Buscar" />
                    </p>
                </b-field>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    name: 'selectClient',
    mounted(){
        this.$refs.selectClient.focus()
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>