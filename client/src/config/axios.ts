import axios from 'axios';

export const axiosInstance = axios.create({
    timeout: 30000,
  })
  
  axiosInstance.interceptors.response.use(res => {
    return res;
  }, err => {
    if(err.response && err.response.status === 401) {
      // logout user and move to authorization page (token expired)
    }

    return Promise.reject(err);
  })