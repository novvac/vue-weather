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
    weatherData: [],
    interval: null,
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
    },
    weatherData(state) {
      return state.weatherData;
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
    },
    setWeatherData(state, payload) {
      state.weatherData = payload;
    }
  },
  actions: {
    SET_USER({commit, dispatch, state}, payload) {
      function login(user) {
        commit("setUser", user);
        commit("setAuthenticated", true);

        if(user.cities.length > 0)
          commit("setActiveCity", user.cities[0].id)

        dispatch("UPDATE_WEATHER");   // first update weather
      }

      if(payload) {
        login(payload);
      } else {
        return axiosInstance.get("/api/user/")
          .then(res => {
            login(res.data);
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
    ADD_CITY({commit, dispatch, state}, payload) {
      return axiosInstance.post("/api/user/city", payload).then(() => {
        commit("setCities", [...state.user.cities, {
          id: payload.id, 
          city: payload.city, 
          country: payload.country, 
          img: "https://images.unsplash.com/photo-1618542314664-c078e8463ed3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1080&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjE4NzUxNzcz&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=720",
          coord: payload.coord
        }])
        Vue.$toast.success(payload.city + " was added to watched!");

        if(state.user.cities.length === 1)
          dispatch("SET_ACTIVE_CITY", payload.id);

        dispatch("UPDATE_WEATHER");
      }).catch(err => {
        if(err.response && err.response.status === 304) {
          Vue.$toast.info("This city is already added!");
        }
      })
    },
    SET_ACTIVE_CITY({commit}, id) {
      localStorage.setItem("active-city", id);
      commit("setActiveCity", id);
    },
    UPDATE_WEATHER({commit, dispatch, state}) {
      if(state.interval) {
        clearInterval(state.interval);
      }
      state.interval = setInterval(() => {    // set 60 seconds cycle...
        dispatch("UPDATE_WEATHER");           // ...and update wether for all cities
      }, 60000);

      let obj = [];
      for(let city of state.user.cities) {
        obj.push(city.id);
      }
      commit("setWeatherData", obj);
    }
  },
  modules: {
  }
})
