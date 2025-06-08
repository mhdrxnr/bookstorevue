// router/index.js
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/landing',
  },
  {
    path: '/store',
    name: 'Store',
    component: () => import('../components/store.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../components/profile.vue'),
  },
  {
    path: '/landing',
    name: 'Landing',
    component: () => import('../components/landing.vue'),
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../components/Admin.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
