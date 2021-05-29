<template>
    <section>
        <h1 class="subtitle is-uppercase is-size-6 has-text-weight-medium ml-1">Administrador de Pedidos</h1>
        <div class="card">
            <header class="card-header">
                <p class="card-header-title px-5 py-4">
                    Gestión Pedidos
                </p>
            </header>
            <div class="card-content">
                <div class="level">
                    <div class="level-left">
                        <div class="level-item">
                            <b-field label="Buscador" message="Puede buscar por nombre del cliente, usuario ó por número de pedido.">
                                <b-input ref="draftInput" placeholder="Puede buscar por nombre del cliente, usuario ó por número de pedido." type="text" expanded v-model="listadoPedidos"></b-input>
                            </b-field>
                        </div>
                    </div>
                    <div class="level-right">
                        <div class="level-item">
                            <b-field class="buttons">
                                <b-button label="Entrantes" type="is-info" outlined :focused="isFocused" @click="getListadoPedido('entrante')"></b-button>
                                <b-button label="Rechazados" type="is-danger" outlined @click="getListadoPedido('rechazado')"></b-button>
                                <b-button label="Despachados" type="is-success" outlined @click="getListadoPedido('despachado')"></b-button>
                                <b-button label="Pendientes" type="is-primary" outlined @click="getListadoPedido('pendiente')"></b-button>
                            </b-field>
                        </div>
                    </div>
                </div>
                <b-table :data="listadoPedidos == null ? [] : filteredListaPedido" striped hoverable paginated per-page="20" default-sort="Norder" default-sort-direction="DESC" :selected.sync="selected" :loading="isLoading">
                    <b-table-column field="Norder" label="Pedido" width="40" centered sortable v-slot="props">
                        {{ props.row.Norder }}
                    </b-table-column>
                    <b-table-column field="codigo" label="Nit" width="40" sortable v-slot="props">
                        {{ props.row.codigo }}
                    </b-table-column>
                    <b-table-column field="nombre" label="Establecimiento" width="40" sortable v-slot="props">
                        {{ props.row.nombre }}
                    </b-table-column>
                    <b-table-column field="fecha" label="Fecha" width="40" sortable v-slot="props">
                        {{ props.row.fecha }}
                    </b-table-column>
                    <b-table-column field="hora" label="Hora" width="40" v-slot="props">
                        {{ props.row.hora }}
                    </b-table-column>
                    <b-table-column field="user" label="Usuario" width="40" v-slot="props">
                        {{ props.row.user }}
                    </b-table-column>
                    <b-table-column field="estado" label="Estado" width="40" v-slot="props">
                        <b-tag :type="typeTag">{{ upperFirst(props.row.estado) }}</b-tag>
                    </b-table-column>
                    <b-table-column field="observacion" label="Observación" width="120" v-slot="props">
                        {{ props.row.observacion }}
                    </b-table-column>
                    <b-table-column field="motivoEstado" label="Motivo" width="50" v-slot="props" :visible="mostrarMotivo">
                        {{ formatearTexto(props.row.motivoEstado) }}
                    </b-table-column>
                    <b-table-column width="150" label="Acciones" centered>
                        <div class="buttons">
                            <div v-if="prueba == true">
                                <b-tooltip label="Rechazar" position="is-left" type="is-danger is-light" v-if="estadoActual !== ''">
                                    <b-button type="is-danger" icon-left="delete" @click="cambiarEstado('rechazado')" />
                                </b-tooltip>
                                <b-tooltip label="Despachar" position="is-right" type="is-success is-light">
                                    <b-button type="is-success" icon-left="receipt" @click="cambiarEstado('despachado')" />
                                </b-tooltip>
                                <b-tooltip label="Pendiente" position="is-right" type="is-primary is-light" v-if="estadoActual !== 'pendiente'">
                                    <b-button type="is-link" icon-left="square-edit-outline" @click="cambiarEstado('pendiente')" />
                                </b-tooltip>
                            </div>
                            <b-tooltip label="Ver pedido" position="is-right" type="is-success is-light" v-if="estadoActual == 'rechazado'">
                                <b-button type="is-success" icon-left="eye" @click="mostarPedido" />
                            </b-tooltip>
                            <b-tooltip label="Ver pedido" position="is-right" type="is-success is-light" v-if="estadoActual == 'despachado'">
                                <b-button type="is-success" icon-left="eye" @click="despacharPedido"/>
                            </b-tooltip>
                        </div>
                    </b-table-column>
                </b-table>
            </div>
        </div>
        <ModalProductos :isModalActive="isModalActive" :productos="productos" @close="closeModal" />
        <b-modal v-model="isModalMotivosActive">
            <div class="modal-card" style="width: 25em; margin: auto;">
                <header class="modal-card-head">
                    <p class="modal-card-title is-size-5 has-text-weight-medium">¿ Cuál es el motivo del rechazo ?</p>
                </header>
                <div class="modal-card-body">
                    <b-field v-for="(value, key, index) in motivosRechazo" :key="index">
                        <b-radio :native-value="value" type="is-danger" v-model="radio">
                            {{value}}
                        </b-radio>
                    </b-field>
                </div>
                <footer class="modal-card-foot">
                    <b-button label="Enviar" type="is-danger" @click="updateMotivo" />
                </footer>
            </div>
        </b-modal>
        <ModalDespacho :isModalActive="isModalDespachoActive" :pedido="selected == null ? {} : selected" @close="closeModal"/>
    </section>
</template>
<script>
import ModalProductos from './BorradorPedidosModalProductos.vue'
import ModalDespacho from './AdminPedidoModalDespacho.vue'
import Toast from '@/classes/Toast'
import _ from 'lodash/string'
import RealDB from '@/classes/DataBase'
export default {
    name: 'adminPurchase',
    components: {
        ModalProductos,
        ModalDespacho
    },
    data() {
        return {
            listadoPedidos: '',
            selected: null,
            arrayList: null,
            getList: null,
            estadoActual: 'entrante',
            isFocused: true,
            isLoading: false,
            isModalActive: false,
            isModalDespachoActive: false,
            isModalMotivosActive: false,
            productos: [],
            motivosRechazo: [],
            radio: ''
        }
    },
    async mounted() {
        await this.getAdminPedidos()
        await this.getMotivosRechazos()
        this.getListadoPedido( 'entrante' )
    },
    methods: {
        async getMotivosRechazos() {
            const db = new RealDB( 'InfoGeneral/motivoRechazo' );
            const motivos = await db.getInfo()
            this.motivosRechazo = motivos.val().sort()
        },
        async cambiarEstado( state ) {
            this.isLoading = true
            if ( state == 'rechazado' ) { await this.prompt() }
            setTimeout( async () => {
                const Norder = this.selected.Norder
                const db = new RealDB( `KardexPedidos/${Norder}` );
                const estado = { estado: state }
                try {
                    await db.update( estado )
                    await this.getListadoPedido( this.estadoActual )
                    this.despacharPedido()
                    this.isLoading = false
                } catch ( e ) {
                    this.isLoading = false
                    Toast.error( e );
                }
            }, 200 )
        },
        async getAdminPedidos() {
            this.isLoading = true
            const db = new RealDB( "KardexPedidos" );
            try {
                // await db.limitLast( 200 )
                //     .once( "value" )
                //     .then( ( res ) => Object.values( res.val() ) )
                //     .then( ( res ) => this.getList = res )
                //     .then( () => this.isLoading = false )
                await db.getInfoRealTime().limitToLast(200).on( 'value', res => {
                    this.getList = Object.values( res.val() )
                    this.isLoading = false
                } )
            } catch ( e ) {
                this.isLoading = false
                Toast.error( e );
            }
        },
        getListadoPedido( value ) {
            this.estadoActual = value
            if (value != 'entrante') this.isFocused = false
                else this.isFocused = true
            this.arrayList = this.getList.filter( x => x.estado == this.estadoActual && x.aplicado == true )
        },
        mostarPedido() {
            setTimeout( () => {
                const { productos } = this.selected
                this.isModalActive = true
                this.productos = productos == undefined ? [] : Object.values( productos )
            }, 100 )
        },
        despacharPedido() {
            this.isModalDespachoActive = true
        },
        prompt() {
            this.isModalMotivosActive = true
        },
        // Definido para colocar el motivo del rechazo.
        async updateMotivo() {
            const Norder = this.selected.Norder
            const db = new RealDB( `KardexPedidos/${Norder}` );
            const estado = { motivoEstado: this.radio }
            this.$emit( 'close' );

            try {
                await db.update( estado );
                this.$children[ 5 ].close()

            } catch ( e ) {
                Toast.error( e );
            }
        },
        upperFirst( x ) {
            return _.upperFirst( x )
        },
        formatearTexto( x ) {
            const lower = _.toLower( x )
            return _.upperFirst( lower )
        },
        closeModal( value ) {
            this.isModalActive = value
            this.isModalDespachoActive = value

        }
    },
    computed: {
        filteredListaPedido() {
            if ( this.arrayList ) {
                return this.arrayList.filter( ( option = {} ) => {
                    return (
                        option.nombre
                        .toString()
                        .toLowerCase()
                        .indexOf( this.listadoPedidos.toLowerCase() ) >= 0 ||
                        option.Norder
                        .toString()
                        .toLowerCase()
                        .indexOf( this.listadoPedidos.toLowerCase() ) >= 0 ||
                        option.user
                        .toString()
                        .toLowerCase()
                        .indexOf( this.listadoPedidos.toLowerCase() ) >= 0
                    );
                } );
            } else {
                return [];
            }
        },
        typeTag() {
            const estado = {
                'entrante': 'is-warning',
                'rechazado': 'is-danger',
                'despachado': 'is-success',
                'pendiente': 'is-primary'
            }
            return estado[ this.estadoActual ]
        },
        mostrarMotivo() {
            if ( this.estadoActual === 'rechazado' ) return true
            else return false
        },
        prueba() {
            const mostrarBotones = {
                'rechazado': false,
                'despachado': false,
                'entrante': true,
                'pendiente': true
            }
            return mostrarBotones[ this.estadoActual ]
        }

    }

}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>