import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthenticated: null,
    user: {},
  },
  getters: {
    isAuthenticated(state) {
      return state.isAuthenticated;
    }
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
    SET_USER({commit}, payload) {
      if(payload) {
        commit("setUser", payload);
        commit("setAuthenticated", true);
      } else {
        return axios.get("/api/user/")
        .then(res => {
          commit("setAuthenticated", true);
          commit("setUser", res.data);
        })
        .catch(err => {
          commit("setAuthenticated", false);
        })
      }
    },
    ADD_CITY({commit}, id) {
      return axios.post("/api/user/city", {id: id})
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        })
    }
  },
  modules: {
  }
})
