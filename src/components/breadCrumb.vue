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
                    <div class="buttons" v-if="n_order > 0">
                        <b-button label="Generar Pedido" type="is-info" icon-left="email-send-outline"></b-button>
                        <b-button label="Exportar Excel" icon-left="microsoft-excel"></b-button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    import RealDB from '@/classes/DataBase'
import { mapState } from "vuex";
export default {
    name: 'breadCrumb',
    props: {
        title: {
            type: String, // String, Number, Boolean, Function, Object, Array
            required: true,
            default: ''
        },
    },
    methods:{
        generarPedido(){

        }
    },
    computed: {
        ...mapState('products',['n_order'])
    },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import url('../assets/foundation/_breadcrumb.scss');
</style>