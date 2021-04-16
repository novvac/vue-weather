import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Accessed from '../views/Accessed.vue'

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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
