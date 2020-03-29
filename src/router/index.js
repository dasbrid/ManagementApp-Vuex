import Vue from 'vue'
import VueRouter from 'vue-router'
import Preferences from '../views/Preferences.vue'
import Tokens from '../views/Tokens.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'tokens',
    component: Tokens
  },
  {
    path: "/preferences",
    name: "preferences",
    component: Preferences
  },
  {
    path: "/tokens",
    name: "tokens",
    component: Tokens
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
