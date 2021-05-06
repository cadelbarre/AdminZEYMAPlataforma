import RealDB from "@/classes/DataBase";
import Toast from "@/classes/Toast";

export default {
  namespaced: true,
  state: {
    client_list: [],
  },
  mutations: {
    SET_CLIENT_LIST(state, value) {
      state.client_list = value;
    },
  },
  actions: {
    async fetchClientsList({ commit, state }) {
      if (state.client_list.length === 0){
        const db = new RealDB("ListaClientes");
        await db
            .fetchData("nombre")
            .then(async (res) => {
              commit("SET_CLIENT_LIST", res.val());
            })
            .catch((e) => {
              Toast.errorCode(`${e.code} - ${e.message}`);
            });
      }

    },
  },
  getters: {},
  modules: {},
};
