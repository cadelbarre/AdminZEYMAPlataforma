import RealDB from "@/classes/DataBase";
import Toast from "@/classes/Toast";

export default {
  namespaced: true,
  state: {
    client_list: [],
    // is_loading: false,
  },
  mutations: {
    SET_CLIENT_LIST(state, value) {
      state.client_list = value;
    },
    // SET_IS_LOADING(state, value) {
    //   state.is_loading = value;
    // },
  },
  actions: {
    async fetchClientsList({ commit }) {
      const db = new RealDB("ListaClientes");
      await db
        .fetchData("nombre")
        .then(async (res) => {
          commit("SET_CLIENT_LIST", res.val());
        //   commit("SET_IS_LOADING", false);
        })
        .catch((e) => {
          Toast.errorCode(`${e.code} - ${e.message}`);
        });
    },
  },
  getters: {},
  modules: {},
};
