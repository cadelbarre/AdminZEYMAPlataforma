import Firebase from "firebase/app";
import "firebase/database";
import Config from "@/classes/Config";

import Toast from '@/classes/Toast'

export default {
    namespaced: true,
    state: {
        client_list: [],
        is_loading: false
    },
    mutations: {
        SET_CLIENT_LIST(state, value) {
            state.client_list = value
        },
        SET_IS_LOADING(state, value){
            state.is_loading = value
        }

    },
    actions: {
        async fetchClientsList({ commit }) {
            if (!Firebase.apps.length) Firebase.initializeApp(Config);
            var db = Firebase.database()
            await db.ref('ListaClientes').orderByChild('nombre').once('value').then( async res => {
                await commit('SET_CLIENT_LIST', res.val())
                await commit('SET_IS_LOADING', false)
            }).catch((e) => {
                Toast.errorCode(`${e.code} - ${e.message}`)
            })

        },

    },
    getters: {},
    modules: {},
};