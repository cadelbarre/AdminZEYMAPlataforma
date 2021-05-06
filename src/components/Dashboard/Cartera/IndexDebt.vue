<template>
    <section>
        <h1 class="subtitle is-uppercase is-size-6 has-text-weight-medium ml-1">Estado de Cuenta Cliente</h1>
        <div class="card">
            <header class="card-header">
                <p class="card-header-title px-5 py-4">
                    Informe Cartera
                </p>
            </header>
            <div class="card-content">
                <b-field label="Seleccionar Cliente">
                    <b-autocomplete ref="selectClientDebt"
                                    field="nombre"
                                    v-model="clientName"
                                    :data="filteredDataClientsList"
                                    expanded
                                    placeholder="Ej. 123456 - Drogueria Carlos - Carlos delbarre"
                                    clearable
                                    @select="(option) => (selected = option)
                    ">
                        <template slot="empty">No hay resultados encontrados.</template>
                    </b-autocomplete>
                </b-field>
                <b-table
                    :data="dataDebt"
                    sticky-header
                    striped hoverable
                    paginated
                    :loading = "isLoading"
                    per-page="20">
                  <b-table-column field="tipo" label="Tipo" width="40" sortable v-slot="props">
                    {{ props.row.tipo }}
                  </b-table-column>
                  <b-table-column field="documento" label="Factura" width="40" sortable centered v-slot="props">
                    {{ props.row.documento }}
                  </b-table-column>
                  <b-table-column field="fecha" label="Facturado" width="40" sortable numeric v-slot="props">
                    {{ formatDate(props.row.fecha) }}
                  </b-table-column>
                  <b-table-column field="vence" label="F. Venc" width="40" sortable numeric v-slot="props">
                    {{ formatDate(props.row.vence) }}
                  </b-table-column>
                  <b-table-column  label="Plazo" width="40"  centered sortable v-slot="props">
                    {{ deadlines(props.row.vence, props.row.fecha) }}
                  </b-table-column>
                  <b-table-column field="vence" label="Dias Vencido" width="40" numeric centered sortable v-slot="props">
                    {{ daysExpired(props.row.vence) }}
                  </b-table-column>
                  <b-table-column field="valoriva" label="IVA" width="40" sortable numeric v-slot="props">
                    {{ formatNumber(props.row.valoriva) }}
                  </b-table-column>
                  <b-table-column field="neto" label="Valor Factura" width="40" numeric v-slot="props">
                    {{ formatNumber(props.row.neto) }}
                  </b-table-column>
                  <b-table-column field="abono" label="Abono" width="40" numeric v-slot="props">
                    {{ formatNumber(props.row.abono) }}
                  </b-table-column>
                  <b-table-column  label="Saldo" width="40" sortable numeric v-slot="props">
                    {{ formatNumber(props.row.neto - props.row.abono) }}
                  </b-table-column>
                  <template #empty>
                    <div class="has-text-centered">
                      <p class="subtitle has-text-grey-light has-text-weight-light">No records</p>
                    </div>
                  </template>
                </b-table>
            </div>
        </div>
    </section>
</template>
<script>
import { mapState } from 'vuex'
import RealDB from '@/classes/DataBase'
import moment from 'moment'
export default {
    name: 'indexCartera',
    data() {
        return {
            clientName: '',
            selected: null,
            isLoading: false,
            dataDebt: []
        }
    },
    mounted(){
        //this.$refs.selectClientDebt.focus()
    },
  methods:{
    formatNumber(x = 0) {
      return x
          .toString()
          .replace(/\D/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    formatDate(x){
      moment.locale('es-mx')
      return moment(x, 'DDMMYYYY').format('D MMM YYYY')
    },
    daysExpired(x){
      moment.locale('es-mx')
      let today = moment(new Date());
      return today.diff(moment(x, 'DDMMYYYY'), 'days')
    },
    deadlines(x, y){
      moment.locale('es-mx')
      return moment(x, 'DDMMYYYY').diff(moment(y, 'DDMMYYYY'), 'days')
    }
  },
    asyncComputed: {
        ...mapState('clients', ['client_list']),
      async getBillsClient(){

          if (this.selected){
            this.isLoading = true;
            let db = new RealDB("MaesFact"),
                that = this
            return await db.orderByEqual("nombre", this.selected.nombre)
                .then((res) => that.dataDebt = Object.values(res.val()))
                .then(that.isLoading = false)

          }else{
            return this.dataDebt = []
          }


      },
         filteredDataClientsList() {
           if (this.client_list) {
             return this.client_list.filter((option = {}) => {
               return (
                   option.nombre
                       .toString()
                       .toLowerCase()
                       .indexOf(this.clientName.toLowerCase()) >= 0
               );
             });
           } else {
             return [];
           }

        },

    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>