import { createRouter, createWebHistory } from 'vue-router'
import Landing from '../components/Landing.vue'
import Store from '../components/Store.vue'
import Profile from '../components/Profile.vue'
import Admin from '../components/Admin.vue'
import { useAuthStore } from '../Stores/AuthStore'

const routes = [
  { path: '/landing', name: 'landing', component: Landing,
    meta: { title: 'home - My Bookstore', favicon: '/house.svg' } },
  { path: '/store', name: 'store', component: Store,
    meta: { title: 'Store - My Bookstore', favicon: '/open-book.svg' } },
  { path: '/profile', name: 'profile', component: Profile,
    meta: { title: 'Profile - My Bookstore', favicon: '/user.svg' } },
  { path: '/admin', name: 'admin', component: Admin,
    meta: { title: 'Admin - My Bookstore', favicon: '/software-engineer.svg' } }
]

// ✅ Create the router FIRST
const router = createRouter({
  history: createWebHistory(),
  routes
})
router.afterEach((to) => {
  const favicon = document.querySelector("link[rel~='icon']") || document.createElement('link')
  favicon.rel = 'icon'
  favicon.href = to.meta.favicon || '/favicon.ico'
  document.head.appendChild(favicon)
})
// ✅ THEN apply the navigation guard
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  if (authStore.isLoading) {
    const unwatch = authStore.$subscribe(() => {
      if (!authStore.isLoading) {
        unwatch()
        proceed()
      }
    })
  } else {
    proceed()
  }

  function proceed() {
    const requiresAuth = ['/store', '/profile', '/admin']
    const isLoggedIn = authStore.isAuthenticated

    if (requiresAuth.includes(to.path) && !isLoggedIn) {
      return next('/landing')
    }

    if (to.path === '/admin' && authStore.user.role !== 'admin') {
      return next('/landing')
    }


    const page = to.path.replace('/', '')
  if (isLoggedIn && page !== 'landing') {
    localStorage.setItem('current_page', page)
    authStore.currentPage = page
  }
    next()
  }
})

export default router
