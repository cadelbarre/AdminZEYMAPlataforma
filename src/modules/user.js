export default {
    namespaced: true,
    state: {
        user_state: null,
        req_auth: false
    },
    mutations: {
        SET_REQ_AUTH(state, value) {
            state.req_auth = value
        },
        SET_USER_STATE(state, value) {
            state.user_state = value
        }
    },
    actions: {
        toggleReqAuth({ commit, state }) {
            let toggle = state.req_auth == false ? true : false
            commit('SET_REQ_AUTH', toggle)
        }
    },
    getters: {},
    modules: {},
};