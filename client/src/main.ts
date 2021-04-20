import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './components/base/index';
import VueParticles from 'vue-particles';
import { axiosInstance } from './config/axios';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import VueApexCharts from "vue-apexcharts";

Vue.config.productionTip = false
Vue.use(VueParticles);
Vue.use(VueToast, {
  position: 'top-right'
});
Vue.use(VueApexCharts);

Vue.component('apexchart', VueApexCharts);
Vue.prototype.$http = axiosInstance;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
