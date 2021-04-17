import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './components/base/index';
import VueParticles from 'vue-particles';
import axios from 'axios';

Vue.config.productionTip = false
Vue.use(VueParticles);

const axiosConfig = {
  baseURL: 'http://192.168.43.5:8081/api/v1/',
  timeout: 30000,
};

Vue.prototype.$axios = axios.create(axiosConfig);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
