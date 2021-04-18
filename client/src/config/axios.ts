import axios from 'axios';
import store from '../store/index';
import router from '../router/index';
import Vue from 'vue';

export const axiosInstance = axios.create({
    timeout: 30000,
  })
  
  axiosInstance.interceptors.response.use(res => {
    return res;
  }, err => {
    if(err.response && err.response.status === 401) {
      store.dispatch("LOGOUT").then(() => {
        router.push({name: "Authorization"});
        Vue.$toast.error("Twoja sesja wygasła! Zaloguj się ponownie!");
      })
    }

    return Promise.reject(err);
  })