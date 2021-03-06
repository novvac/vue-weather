import axios from 'axios';
import Vue from 'vue'
import Vuex from 'vuex'
import { axiosInstance } from '../config/axios';

Vue.use(Vuex)

interface CityInterface {
  id: number,
  city: string,
  country: string,
  img: string,
  coord: {
    lat: number,
    lon: number
  }
}

export default new Vuex.Store({
  state: {
    isAuthenticated: null,
    user: {
      cities: Array(),
    },
    activeCity: 0,
    activeDay: 0,
    weatherData: [],
    interval: Number(),
    handyLoader: false,
    drawer: false,
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
    activeDay(state) {
      return state.activeDay;
    },
    weatherData(state) {
      return state.weatherData;
    },
    drawer(state) {
      return state.drawer;
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
    setActiveCity(state, index) {
      const _activeCity : string = localStorage.getItem('active-city')!;
      if(_activeCity) {
        state.activeCity = parseInt(_activeCity);

        if(parseInt(_activeCity) >= state.user.cities.length) {
          state.activeCity = 0;
        }
      } else {
        state.activeCity = index;
      }
    },
    setActiveDay(state, val) {
      state.activeDay = val;
    },
    setWeatherData(state, payload) {
      state.weatherData = payload;
    },
    setHandyLoader(state, val) {
      state.handyLoader = val;
    },
    toggleDrawer(state, val) {
      if(val)
        state.drawer = val;
      else
        state.drawer = !state.drawer;

      localStorage.setItem('drawer', state.drawer.toString());
    }
  },
  actions: {
    SET_USER({commit, dispatch}, payload) {
      function login(user : any) {
        commit("setUser", user);
        commit("setAuthenticated", true);
        const _drawer : string = localStorage.getItem("drawer")!;

        // if user is logged and have any cities. Set active city to first of them
        if(user.cities.length > 0)
          commit("setActiveCity", 0)
        // if drawer was saved to localstorage with "true" - open drawer
        if(_drawer === "true") {
          dispatch("TOGGLE_DRAWER", true);
        }

        dispatch("UPDATE_WEATHER");   // first update weather
      }

      // if payload (user object after clicked 'sign in') provided
      if(payload) {
        // save them
        login(payload);
      } else {
        // else, load user with token (token saved in cookies with HttpOnly)
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

        // if added city is first - set active city to them and open drawer
        if(state.user.cities.length === 1) {
          dispatch("SET_ACTIVE_CITY", 0);
          dispatch("TOGGLE_DRAWER", true);
        }

        dispatch("UPDATE_WEATHER");
      }).catch(err => {
        if(err.response && err.response.status === 304) {
          Vue.$toast.info("This city is already added!");
        }
      })
    },
    REMOVE_CITY({commit, dispatch, state}, id) {
      commit("setHandyLoader", true);
      return axiosInstance.delete("/api/user/city/"+id).then(() => {
        let citiesIds = state.user.cities.map(el => el.id);
        let citiesRef = state.user.cities;
        citiesRef.splice(citiesIds.indexOf(id), 1);
        const _activeCity : string = localStorage.getItem("active-city")!;

        // if active city index is out of scope - set active city to last of cities
        if(parseInt(_activeCity) >= state.user.cities.length) {
          state.activeCity = state.user.cities.length - 1;
        }
        
        commit("setHandyLoader", false);
        dispatch("UPDATE_WEATHER");
        Vue.$toast.success("City was removed from watched!");
      }).catch(err => {
        Vue.$toast.error("Something went wrong!");
      })
    },
    UPDATE_CITY({commit}, payload) {
      commit("setHandyLoader", true);
      return axiosInstance.put("/api/user/city/" + payload.id, payload.data).then(() => {
        commit("setHandyLoader", false);
      })
    },
    SET_ACTIVE_CITY({commit}, index) {
      localStorage.setItem("active-city", index);
      commit("setActiveCity", index);
    },
    SET_ACTIVE_DAY({commit}, value) {
      commit("setActiveDay", value);
    },
    UPDATE_WEATHER({commit, dispatch, state}) {
      commit("setHandyLoader", true);
      if(state.interval) {
        clearInterval(state.interval);
      }
      if(state.isAuthenticated) {
        state.interval = setInterval(() => {    // set 60 seconds cycle...
          dispatch("UPDATE_WEATHER");           // ...and update wether for all cities
        }, 60000);

        function cityWeather(city : CityInterface) {
          return axiosInstance.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&units=metric&appid=d8a55c1870426b0d48e5a2ddad306894`);
        }
  
        // requests for all cities
        let requests = [];
        for(let i=0; i<state.user.cities.length; i++) {
          requests.push(cityWeather(state.user.cities[i]));
        }
  
        // make all request "by one"
        axios.all(requests).then(res => {
          let obj = res.map(el => {
            return el.data;
          });
          commit("setWeatherData", obj);
          commit("setHandyLoader", false);
        }).catch(err => {
          console.log(err.response);
        })
      }
    },
    TOGGLE_DRAWER({commit}, val) {
      commit('toggleDrawer', val);
    },
    SET_HANDY_LOADER({commit}, val) {
      commit('setHandyLoader', val);
    }
  },
  modules: {
  }
})
