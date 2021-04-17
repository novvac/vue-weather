import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthenticated: null,
    user: {},
  },
  mutations: {
    setAuthenticated(state, payload) {
      state.isAuthenticated = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    }
  },
  actions: {
    SET_AUTHENTICATED({commit}, payload) {
      commit("setAuthenticated", payload);
    },
    SET_USER({commit}, user) {
      commit('setUser', user);
    }
  },
  modules: {
  }
})
