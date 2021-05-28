<template>
    <section>
        <b-loading is-full-page v-model="getLoading" :can-cancel="true"></b-loading>
        <div class="card">
            <header class="card-header">
                <p class="card-header-title px-5 py-4">Gestión de Cliente</p>
            </header>
            <div class="card-content">
                <b-field label="Seleccionar Cliente">
                    <b-autocomplete ref="selectClient" field="nombre" v-model="clientName" open-on-focus :data="filteredDataClientsList" expanded placeholder="Ej. 123456 - Drogueria Carlos - Carlos delbarre" clearable @select="(option) => (selected = option)">
                        <template slot="empty">No hay resultados encontrados.</template>
                    </b-autocomplete>
                </b-field>
            </div>
        </div>
        <DebtClient :clientSelected="selected == null ? {} : selected" />
    </section>
</template>
<script>
import Auth from '@/classes/AuthUser'
import RealDB from '@/classes/DataBase'
import Toast from '@/classes/Toast'
import moment from "moment";
import { mapState, mapActions } from "vuex";
import DebtClient from "./PedidoSelectClientDebt.vue";

export default {
    name: "selectClient",
    components: {
        DebtClient,
    },
    data() {
        return {
            clientName: "",
            selected: null,
        };
    },
    mounted() {
        this.$refs.selectClient.focus();
    },
    methods: {
        ...mapActions( "products", [ "getNOrder" ] ),
        handleSelectedClient() {
            this.$emit( "selectedClient", this.selected );
            this.saveClientInfo( this.selected )
        },
        async saveClientInfo( value ) {

            await this.getNOrder();
            if ( value == null ) return

            moment.locale( "es-mx" );
            let clientInfo = {
                codigo: value.codigo,
                nombre: value.nombre,
                listapre: value.listapre,
                contacto: value.contacto,
                nit: value.nit,
                direccion: value.direccion,
                Norder: this.n_order,
                user: Auth.currentUser().email,
                fecha: moment().format( "L" ),
                hora: moment().format( "LTS" ),
                modificado: false,
                aplicado: false,
                estado: "entrante",
                observacion: [],
                motivoEstado: ''
            };

            let db = new RealDB( `KardexPedidos/${this.n_order}` );

            try {
                db.update( clientInfo );
            } catch ( e ) {
                Toast.error( `${e}` );
            }
        },
    },
    computed: {
        ...mapState( "clients", [ "client_list" ] ),
        ...mapState( "products", [ "product_list", 'n_order' ] ),
        getLoading() {
            if ( this.product_list == null ) return true
            else return false
        },

        filteredDataClientsList() {
            if ( this.client_list ) {
                return this.client_list.filter( ( option = {} ) => {
                    return (
                        option.nombre
                        .toString()
                        .toLowerCase()
                        .indexOf( this.clientName.toLowerCase() ) >= 0
                    );
                } );
            } else {
                return [];
            }
        },
    },
    asyncComputed: {
        isSelected() {
            if ( this.selected !== null ) return this.handleSelectedClient();
        },
    }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>