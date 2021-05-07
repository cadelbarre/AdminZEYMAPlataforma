export default {
  namespaced: true,
  state: {
    req_auth: false,
  },
  mutations: {
    SET_REQ_AUTH(state, value) {
      state.req_auth = value;
    },
  },
  actions: {
    addReqAuth({ commit }) {
      let add = true;
      commit("SET_REQ_AUTH", add);
    },
    removeReqAuth({ commit }) {
      let remove = false;
      commit("SET_REQ_AUTH", remove);
    },
  },
  getters: {
    isUserLoggedIn(state) {
      return state.req_auth;
    },
  },
  modules: {},
};
