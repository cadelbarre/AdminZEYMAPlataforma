import Vue from 'vue'
import Vuex from 'vuex'

import user from '../modules/user'
import products from '../modules/products'
import clients from '../modules/clients'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        layout: 'login-layout',
    },
    mutations: {
        SET_LAYOUT(state, newLayout) {
            state.layout = newLayout
        }
    },
    actions: {

    },
    modules: {
        user,
        products,
        clients
    }
})