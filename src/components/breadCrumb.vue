<template>
    <section class="mb-3">
        <b-loading :is-full-page="true" v-model="isLoading" :can-cancel="true"></b-loading>
        <div class="level">
            <div class="level-left">
                <div class="level-item">
                    <h1 class="subtitle is-uppercase is-size-6 has-text-weight-medium ml-1">{{title}}</h1>
                </div>
            </div>
            <div class="level-right">
                <div class="level-item">
                    <div class="buttons" v-if="n_order > 0">
                        <b-button label="Generar Pedido" type="is-info" icon-left="email-send-outline" @click="generarPedido"></b-button>
                        <b-button label="Exportar Excel" icon-left="microsoft-excel"></b-button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import RealDB from '@/classes/DataBase'
import Toast from '@/classes/Toast'
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
    data(){
        return {
            isLoading: false
        }
    },
    methods:{
        async generarPedido(){
            const Norder = this.n_order
            const aplicado = { aplicado: true }
            let db = new RealDB(
                `KardexPedidos/${Norder}`
            );

            const productos = await db.getInfo()
            if (productos.val().productos == undefined) 
                return this.$buefy.dialog.alert( {
                    title: 'Error',
                    message: 'No has ingresado ningún producto al pedido. ',
                    type: 'is-danger',
                    hasIcon: true,
                    icon: 'alert-circle',
                    ariaRole: 'alertdialog',
                    ariaModal: true
                } )

            this.isLoading = true
            try {
                await db.update( aplicado );
                location.reload()
                this.isLoading = false 
            } catch ( e ) {
                this.isLoading = false 
                Toast.error( e );
            }
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