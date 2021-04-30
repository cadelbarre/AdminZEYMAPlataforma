<template>
    <section class="mb-3">
        <div class="level">
            <div class="level-left">
                <div class="level-item">
                    <h1 class="subtitle is-uppercase is-size-6 has-text-weight-medium ml-1">{{title}}</h1>
                </div>
            </div>
            <div class="level-right">
                <div class="level-item">
                    <div class="buttons">
                        <b-button label="Informe Pedidos"></b-button>
                        <b-button label="Exportar Excel" type="is-info"></b-button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    name: 'breadCrumb',
    props: {
        title: {
            type: String, // String, Number, Boolean, Function, Object, Array
            required: true,
            default: ''
        },
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import url('../assets/foundation/_breadcrumb.scss');
</style>