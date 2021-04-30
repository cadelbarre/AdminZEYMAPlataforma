export default {
  namespace: true,
  state: {
    layout: "login-layout",
  },
  mutations: {
    SET_LAYOUT(state, newLayout) {
      state.layout = newLayout;
    },
  },
  actions: {},
  getters: {},
  modules: {},
};
