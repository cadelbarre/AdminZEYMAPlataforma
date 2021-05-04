import RealDB from "@/classes/DataBase";
import Toast from "@/classes/Toast";

export default {
  namespaced: true,
  state: {
    product_list: [],
  },
  mutations: {
    SET_PRODUCT_LIST(state, value) {
      state.product_list = value;
    },
  },
  actions: {
    async fetchProductList({ commit }) {
      const db = new RealDB("ListaProductos");
      await db
        .fetchData("nombre1")
        .then(async (res) => {
          commit("SET_PRODUCT_LIST", res.val());
        })
        .catch((e) => {
          Toast.errorCode(`${e.code} - ${e.message}`);
        });
    },
  },
  getters: {},
  modules: {},
};
