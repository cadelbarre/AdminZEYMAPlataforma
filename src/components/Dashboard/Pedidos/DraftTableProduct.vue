<template>
  <section>
    <div class="card">
      <div class="card-header">
        <div class="card-header-title px-5 py-4">
          Orden de Compra del Cliente
        </div>
      </div>
      <div class="card-content">
        <b-table
          :data="[]"
          sticky-header
          striped
          hoverable
          paginated
          per-page="10"
        ></b-table>
        <b-field label="Observación">
          <b-input maxlength="200" type="textarea"></b-input>
        </b-field>
      </div>
    </div>
    <pre>{{showNorder}}</pre>
  </section>
</template>

<script>
import RealDB from '@/classes/DataBase'
import Toast from '@/classes/Toast'
export default {
    name: 'borradorTablaProdcutos',
    props: {
        Norder: {
            type: Number,
            require: true,
            default: 0
        },
    },
    created () {
    },
    methods: {
        getDraft() {
            let db = new RealDB(`KradexPedidos/${this.Norder}`)
            db.getInfo()
            .then( res => res.val())
            .catch( e => Toast.error(`${e.code} - ${e.message}`))
        }
    },
    asyncComputed:{
        showNorder(){
            return this.Norder
        }
    }
};
</script>

<style></style>
