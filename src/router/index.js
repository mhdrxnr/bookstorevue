import { createRouter, createWebHistory } from 'vue-router'
import { authStore } from '../Stores/AuthStore'

const routes = [
  { path: '/', redirect: '/landing' },
  { path: '/store', name: 'Store', component: () => import('../components/store.vue'), meta: { requiresAuth: true } },
  { path: '/profile', name: 'Profile', component: () => import('../components/profile.vue'), meta: { requiresAuth: true } },
  { path: '/landing', name: 'Landing', component: () => import('../components/landing.vue') },
  { path: '/admin', name: 'Admin', component: () => import('../components/Admin.vue'), meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Delay navigation until auth is resolved
router.beforeEach(async (to) => {
  const store = authStore
  if (store.isLoading === false && store.isAuthenticated === null) {
    await store.fetchUser()
  } else if (store.isLoading === true) {
    await store.fetchUser()
  }
  if (to.meta.requiresAuth && !store.isAuthenticated) {
    return { name: 'Landing' }
  }
})

export default router
