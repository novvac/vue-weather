import Vue from 'vue'
import Vuex from 'vuex'
import { axiosInstance } from '../config/axios';

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
        return axiosInstance.get("/api/user/")
          .then(res => {
            commit("setAuthenticated", true);
            commit("setUser", res.data);
          })
          .catch(err => {
            commit("setAuthenticated", false);
          })
      }
    },
    LOGOUT({commit}) {
      return axiosInstance.post("/api/auth/logout")
        .then(res => {
          commit("setUser", {});
          commit("setAuthenticated", false);
        })
    },
    ADD_CITY({commit}, id) {
      return axiosInstance.post("/api/user/city", {id: id})
    }
  },
  modules: {
  }
})
