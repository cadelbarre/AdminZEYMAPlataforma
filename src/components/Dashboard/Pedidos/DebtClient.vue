<template>
    <section class="columns">
        <div class="column">
            <div class="card">
                <div class="card-content">
                    <h3 class="has-text-weight-medium is-uppercase">Cupo</h3>
                    <p class="is-size-4 has-text-blue-dark tx-rubik is-inline">$ 6.000.000</p>
                    <b-tag type="is-info is-inline ml-1">Credito a 30 días</b-tag>
                </div>
            </div>
        </div>
        <div class="column">
            <div class="card">
                <div class="card-content">
                    <h3 class="has-text-weight-medium is-uppercase">Saldo Cartera</h3>
                    <p class="is-size-4 has-text-blue-dark tx-rubik is-inline">$ 7.500.000</p>
                    <!-- <b-tag type="is-danger is-inline ml-1">Sobrecupo</b-tag> -->
                </div>
            </div>
        </div>
        <div class="column">
            <div class="card">
                <div class="card-content">
                    <h3 class="has-text-weight-medium is-uppercase">Cupo Disponible</h3>
                    <p class="is-size-4 has-text-blue-dark tx-rubik is-inline">$ - 1.500.000 </p>
                    <b-tag type="is-danger is-inline ml-1">Sobrecupo</b-tag>
                </div>
            </div>
        </div>
        <div class="column">
            <div class="card">
                <div class="card-content">
                    <h3 class="has-text-weight-medium is-uppercase">Cartera Vencida</h3>
                    <p class="is-size-4 has-text-blue-dark tx-rubik is-inline">$ 498.000</p>
                    <b-tag type="is-danger is-inline ml-1"> 3 Fac. vencidas</b-tag>
                </div>
            </div>
        </div>
        <pre>
            {{getDebtClient}}
        </pre>
        <pre>
            {{clientSelected}}
        </pre>
    </section>
</template>
<script>
import RealDB from '@/classes/DataBase'
export default {
    name: 'DebtClient',
    props: {
        clientSelected: {
            type: Object, // String, Number, Boolean, Function, Object, Array
            required: true,
            default: () => {}
        }
    },
    asyncComputed: {
        async getDebtClient() {
            if (!Object.keys(this.clientSelected).length === 0) {
                let that = this
                let db = new RealDB('MaesFact')
                let debt = null
                await db.orderByEqual('nombre', this.clientSelected.nombre).then(res => {
                    that.debt = res.val()
                    console.log(res.val())
                }).catch(e => {
                    console.log(e)
                })

                return debt
            }
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>