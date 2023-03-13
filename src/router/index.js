import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../components/LoginComponent.vue')
  },
  {
    path: '/organizations',
    name: 'Organizations',
    component: () => import(/* webpackChunkName: "orgs" */ '../components/OrgsComponent.vue')
  },
  {
    path: '/organizations/:id',
    name: 'Organization Details',
    component: () => import(/* webpackChunkName: "org" */ '../components/OrgComponent.vue')
  },
  {
    path: '/teams',
    name: 'Teams',
    component: () => import(/* webpackChunkName: "teams" */ '../components/TeamsComponent.vue')
  },
  {
    path: '/teams/:id',
    name: 'Team Details',
    component: () => import(/* webpackChunkName: "team" */ '../components/TeamComponent.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
