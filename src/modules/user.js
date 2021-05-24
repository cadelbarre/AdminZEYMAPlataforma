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
      let auth = true;
      commit("SET_REQ_AUTH", auth);
    },
    removeReqAuth({ commit }) {
      let auth = false;
      commit("SET_REQ_AUTH", auth);
    },
  },
  getters: {
    isUserLoggedIn(state) {
      return state.req_auth;
    },
  },
  modules: {},
};
