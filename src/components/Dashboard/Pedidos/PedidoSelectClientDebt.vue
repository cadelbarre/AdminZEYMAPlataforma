<template>
    <section class="columns is-centered">
        <div class="column">
            <div class="card">
                <div class="card-content has-text-centered is-block" v-if="!loading">
                    <h3 class="has-text-weight-medium is-uppercase">Cupo</h3>
                    <p class="is-size-3 has-text-blue-dark tx-rubik">
                        $ {{ formatNumber(infoDebtClient.cupo) }}
                    </p>
                    <b-tag v-if="clientSelected.dias !== null" type="is-info">Credito a {{ clientSelected.dias }} días</b-tag>
                </div>
                <div class="card-content" v-if="loading">
                    <b-skeleton height="20px" animated :active="loading"></b-skeleton>
                    <b-skeleton height="40px" animated :active="loading"></b-skeleton>
                </div>
            </div>
        </div>
        <div class="column">
            <div class="card">
                <div class="card-content has-text-centered is-block" v-if="!loading">
                    <h3 class="has-text-weight-medium is-uppercase">Saldo Cartera</h3>
                    <p class="is-size-3 has-text-blue-dark tx-rubik">
                        $ {{ formatNumber(infoDebtClient.amount) }}
                    </p>
                    <b-tag v-if="infoDebtClient.bills.count < 1" type="is-success">Cartera al Dia</b-tag>
                    <b-tag v-else type="is-danger">Debe colocarse al dia</b-tag>
                </div>
                <div class="card-content has-text-centered is-block" v-if="loading">
                    <b-skeleton height="20px" animated :active="loading"></b-skeleton>
                    <b-skeleton height="40px" animated :active="loading"></b-skeleton>
                </div>
            </div>
        </div>
        <div class="column">
            <div class="card">
                <div class="card-content has-text-centered is-block" v-if="!loading">
                    <h3 class="has-text-weight-medium is-uppercase">Cupo Disponible</h3>
                    <p class="is-size-3 has-text-blue-dark tx-rubik">
                        $
                        {{ infoDebtClient.available &lt; 0 ? ` - ${formatNumber(infoDebtClient.available)}` : formatNumber(infoDebtClient.available) }}
                    </p>
                    <b-tag v-if="infoDebtClient.available < 0" type="is-danger">Sobrecupo</b-tag>
                    <b-tag v-else type="is-success">Disponible</b-tag>
                </div>
                <div class="card-content has-text-centered is-block" v-if="loading">
                    <b-skeleton height="20px" animated :active="loading"></b-skeleton>
                    <b-skeleton height="40px" animated :active="loading"></b-skeleton>
                </div>
            </div>
        </div>
        <div class="column">
            <div class="card">
                <div class="card-content has-text-centered is-block" v-if="!loading">
                    <h3 class="has-text-weight-medium is-uppercase">Cartera Vencida</h3>
                    <p class="is-size-3 has-text-blue-dark tx-rubik">
                        $ {{ infoDebtClient.bills == undefined ? 0 : formatNumber(infoDebtClient.bills.debts) }}
                    </p>
                    <b-tag type="is-danger"> {{ infoDebtClient.bills == undefined ? 0 : infoDebtClient.bills.count }} Fac. vencidas</b-tag>
                </div>
                <div class="card-content has-text-centered is-block" v-if="loading">
                    <b-skeleton height="20px" animated :active="loading"></b-skeleton>
                    <b-skeleton height="40px" animated :active="loading"></b-skeleton>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import RealDB from "@/classes/DataBase";
import Toast from "@/classes/Toast";
import moment from 'moment';
import { formattedNumber } from '@/functions/general'
export default {
    name: "DebtClient",
    props: {
        clientSelected: {
            type: Object, // String, Number, Boolean, Function, Object, Array
            required: true,
            default: () => {},
        },
    },
    data() {
        return {
            infoDebtClient: {},
            cartera: null,
            loading: false
        };
    },
    methods: {
        getTotalDeuda( x ) {
            let dataDebt = Object.values( x );
            let reducer = ( acc, el ) => acc + Number( el.valor )
            return dataDebt.reduce( reducer, 0 );
        },
        getAbono( x ) {
            let deposit = Object.values( x );
            let reducer = ( acc, el ) => typeof el.abono == "string" ? Number( acc + el.abono ) : acc
            return deposit.reduce( reducer, 0 );
        },
        getDiasVencidas( x ) {
            let bills = Object.values( x )
            moment.locale( 'es-mx' )
            let today = moment( new Date() );

            let reducer = ( acc, el ) => {
                if ( today.diff( moment( el.vence, 'DDMMYYYY' ), 'days' ) > 0 ) {
                    acc[ 'count' ] += 1,
                    acc[ 'debts' ] += el.neto
                }
                return acc
            }
            return bills.reduce( reducer, { 'count': 1, 'debts': 0 } )
        },
        formatNumber( x = 0 ) {
            return formattedNumber( x )
        },
    },
    asyncComputed: {
        async getDebtClient() {
            if ( Object.keys( this.clientSelected ).length !== 0 ) {
                this.loading = true;
                let db = new RealDB( "MaesFact" ),
                    deposit = null,
                    bills = null,
                    debt = {},
                    debtClient = null,
                    that = this;
                await db
                    .orderByEqual( "nombre", this.clientSelected.nombre )
                    .then( async ( res ) => {
                        if ( res.val() != null ) {
                            const cartera = res.val()
                            this.cartera = cartera
                            debtClient = await that.getTotalDeuda( cartera );
                            deposit = await that.getAbono( cartera );
                            bills = await that.getDiasVencidas( cartera );

                            that.infoDebtClient = {
                                cupo: Number( that.clientSelected.cupo ),
                                amount: debtClient - deposit,
                                available: that.clientSelected.cupo - ( debtClient - deposit ),
                                bills: bills
                            };
                            that.loading = false;

                        } else {
                            that.infoDebtClient = {
                                cupo: Number( that.clientSelected.cupo ),
                                amount: 0,
                                available: 0,
                                
                            };
                            that.loading = false;
                        }
                    } )
                    .catch( ( e ) => {
                        Toast.error( `${e.code} - ${e.message}` );
                        that.loading = false;
                    } );

                return debt;
            } else {
                this.infoDebtClient = {
                    cupo: 0,
                    amount: 0,
                    available: 0,
                    bills: {
                        count: 0,
                        debts: 0
                    }
                };
                this.cartera = null
                this.loading = false;
            }
        },
    },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>