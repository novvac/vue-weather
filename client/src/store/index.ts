import Vue from 'vue'
import Vuex from 'vuex'
import { axiosInstance } from '../config/axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthenticated: null,
    user: {
      cities: [],
    },
    activeCity: undefined,
  },
  getters: {
    isAuthenticated(state) {
      return state.isAuthenticated;
    },
    cities(state) {
      return state.user.cities;
    },
    activeCity(state) {
      return state.activeCity;
    }
  },
  mutations: {
    setAuthenticated(state, payload) {
      state.isAuthenticated = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setCities(state, payload) {
      state.user.cities = payload;
    },
    setActiveCity(state, id) {
      if(localStorage.getItem("active-city"))
        state.activeCity = localStorage.getItem("active-city");
      else
        state.activeCity = id;
    }
  },
  actions: {
    SET_USER({commit}, payload) {
      if(payload) {
        commit("setUser", payload);
        commit("setAuthenticated", true);

        if(payload.cities.length > 0)
          commit("setActiveCity", payload.cities[0].id)
      } else {
        return axiosInstance.get("/api/user/")
          .then(res => {
            commit("setAuthenticated", true);
            commit("setUser", res.data);

            if(res.data.cities.length > 0)
              commit("setActiveCity", res.data.cities[0].id)
          })
          .catch(err => {
            if(err.response && err.reponse.status !== 304)
              commit("setAuthenticated", false);
          })
      }
    },
    LOGOUT({commit}) {
      return axiosInstance.post("/api/auth/logout")
        .then(res => {
          localStorage.clear();
          commit("setUser", {});
          commit("setAuthenticated", false);
        })
    },
    ADD_CITY({commit, state}, payload) {
      return axiosInstance.post("/api/user/city", payload).then(() => {
        commit("setCities", [...state.user.cities, {
          id: payload.id, 
          city: payload.city, 
          country: payload.country, 
          img: "https://images.unsplash.com/photo-1618542314664-c078e8463ed3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1080&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjE4NzUxNzcz&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=720"
        }])
        Vue.$toast.success(payload.city + " was added to watched!");
      }).catch(err => {
        if(err.response && err.response.status === 304) {
          Vue.$toast.info("This city is already added!");
        }
      })
    },
    SET_ACTIVE_CITY({commit}, id) {
      localStorage.setItem("active-city", id);
      commit("setActiveCity", id);
    }
  },
  modules: {
  }
})
