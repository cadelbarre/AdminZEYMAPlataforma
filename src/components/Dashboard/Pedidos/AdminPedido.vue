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
                                <b-button label="Entrantes" type="is-warning" focused active 
                                @click="getListadoPedido('entrante')"></b-button>
                                <b-button label="Rechazados" type="is-danger" outlined 
                                @click="getListadoPedido('rechazado')"></b-button>
                                <b-button label="Despachados" type="is-success" outlined 
                                @click="getListadoPedido('despachar')"></b-button>
                                <b-button label="Pendientes" type="is-primary" outlined 
                                @click="getListadoPedido('pendiente')"></b-button>
                            </b-field>
                        </div>
                    </div>
                </div>
                <!-- <b-table :data="data" :columns="columns" sticky-header striped hoverable paginated per-page="10"></b-table> -->
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
                    <b-table-column field="hora" label="Hora" width="40" sortable v-slot="props">
                        {{ props.row.hora }}
                    </b-table-column>
                    <b-table-column field="user" label="Usuario" width="40" v-slot="props">
                        {{ props.row.user }}
                    </b-table-column>
                    <b-table-column field="estado" label="Estado" width="40" v-slot="props">
                        {{ tag(props.row.estado) }}
                    </b-table-column>
                    <b-table-column width="150" label="Acciones" centered>
                        <div class="buttons">
                            <b-tooltip label="Rechazar" position="is-left" type="is-danger is-light" v-if="estadoActual !== ''">
                                <b-button type="is-danger" icon-left="delete" @click="cambiarEstado('rechazado')" />
                            </b-tooltip>
                            <b-tooltip label="Despachar" position="is-right" type="is-success is-light">
                                <b-button type="is-success" icon-left="receipt" @click="cambiarEstado('despachar')" />
                            </b-tooltip>
                            <b-tooltip label="Pendiente" position="is-right" type="is-info is-light" v-if="estadoActual !== 'pendiente'">
                                <b-button type="is-link" icon-left="square-edit-outline" @click="cambiarEstado('pendiente')" />
                            </b-tooltip>
                        </div>
                    </b-table-column>
                </b-table>
            </div>
        </div>
    </section>
</template>
<script>
import Toast from '@/classes/Toast'
import RealDB from '@/classes/DataBase'
export default {
    name: 'adminPurchase',
    data() {
        return {
            listadoPedidos: '',
            selected: null,
            isLoading: false,
            arrayList: null,
            estadoActual: 'entrante'
        }
    },
    mounted() {
        this.getListadoPedido( 'entrante' )
    },
    methods: {
        async getListadoPedido( x ) {
            this.isLoading = true
            this.estadoActual = x
            const db = new RealDB( "KardexPedidos" );
            try {
                await db
                    .orderByEqual( "estado", x )
                    .then( ( res ) => Object.values( res.val() ) )
                    .then( ( res ) => ( this.arrayList = res ) )
                    .then( () => this.isLoading = false )
            } catch ( e ) {
                this.isLoading = false
                Toast.error( e );
            }
        },
        cambiarEstado( status ) {
            this.isLoading = true
            setTimeout( async () => {
                const Norder = this.selected.Norder
                const db = new RealDB( `KardexPedidos/${Norder}` );
                const estado = { estado: status }
                try {
                    await db.update( estado )
                    this.getListadoPedido( 'entrante' )
                    this.isLoading = false
                } catch ( e ) {
                    this.isLoading = false
                    Toast.error( e );
                }
            }, 200 )
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
                        .indexOf( this.listadoPedidos.toLowerCase() ) >= 0

                    );
                } );
            } else {
                return [];
            }
        },
    },
    tag(x){
        const estado = {
            'entrante': 'is-warning',
            'rechazado': 'is-danger',
            'despachar': 'is-success',
            'pendiente': 'is-primary'
        }
        console.log(estado[x])
        return estado[x]
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>