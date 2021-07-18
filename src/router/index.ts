import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "default" */ '../views/Index.vue')
  },
  {
    path: '/mobile',
    component: () => import(/* webpackChunkName: "mobile" */ '../views/Mobile.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
