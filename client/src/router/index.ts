import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Accessed from '../views/Accessed.vue'
import store from '../store/index';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Accessed',
    component: Accessed
  },
  {
    path: "/authorization",
    name: "Authorization",
    component: () => import('../views/Auth.vue')
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const guards = () => {
    if(to.name === "Authorization" && store.getters.isAuthenticated) {
      next({name: "Accessed"});
    } else if(to.name === "Accessed" && !store.getters.isAuthenticated) {
      next({name: "Authorization"});
    } else {
      next();
    }
  }

  // check if user is authenticated or value is null (website was refresh)
  if(store.state.isAuthenticated === null) {
    store.dispatch("SET_USER").then(res => {
      guards();
    })
  } else {
    guards();
  }
})

export default router
