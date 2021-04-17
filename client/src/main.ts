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

const axiosInstance = axios.create({
  timeout: 30000,
})

Vue.prototype.$http = axiosInstance;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
