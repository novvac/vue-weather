import axios from 'axios';
import store from '../store/index';
import router from '../router/index';

export const axiosInstance = axios.create({
    timeout: 30000,
  })
  
  axiosInstance.interceptors.response.use(res => {
    return res;
  }, err => {
    if(err.response && err.response.status === 401) {
      // logout user and move to authorization page (token expired)
      store.dispatch("LOGOUT").then(() => {
        console.log(router.push({name: "Authorization"}));
        router.push({name: "Authorization"});
      })
    }

    return Promise.reject(err);
  })