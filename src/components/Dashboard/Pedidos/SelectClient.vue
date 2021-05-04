<template>
    <section>
         <b-loading is-full-page v-model="getLoading" :can-cancel="true"></b-loading>
        <div class="card">
            <header class="card-header">
                <p class="card-header-title px-5 py-4">
                    Gestión de Cliente
                </p>
            </header>
            <div class="card-content">
                <b-field label="Seleccionar Cliente">
                    <!-- <b-input ref="selectClient" type="text" placeholder="Ej. 123456 - Drogueria Carlos - Carlos delbarre" expanded></b-input> -->
                    <b-autocomplete ref="selectClient" field="nombre" v-model="clientName" :data="filteredDataClientsList" expanded placeholder="Ej. 123456 - Drogueria Carlos - Carlos delbarre" clearable @select="(option) => (selected = option)
                    ">
                        <template slot="empty">No hay resultados encontrados.</template>
                    </b-autocomplete>
                    <p class="control">
                        <b-button type="is-info" label="Buscar" />
                    </p>
                </b-field>
            </div>
        </div>
        <DebtClient :clientSelected="selected"/>
    </section>
</template>
<script>
import { mapState } from 'vuex';
import DebtClient from './DebtClient.vue'
export default {
    name: 'selectClient',
    components: {
        DebtClient
    },
    data() {
        return {
            clientName: '',
            selected: {},
        }
    },
    mounted() {
        this.$refs.selectClient.focus()
    },
    asyncComputed: {
        ...mapState('clients', ['client_list', 'is_loading']),
        getLoading(){
            return this.is_loading
        },
        async filteredDataClientsList() {
            return await this.client_list.filter((option) => {
                return (
                    option.nombre
                    .toString()
                    .toLowerCase()
                    .indexOf(this.clientName.toLowerCase()) >= 0
                );
            });
        },
        
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>