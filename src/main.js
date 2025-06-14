import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import axios from 'axios'
import { createPinia } from 'pinia'
import router from './router'
import { useAuthStore } from './Stores/AuthStore'

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)

const authStore = useAuthStore(pinia)
router.afterEach((to) => {
  const defaultTitle = 'My Bookstore'
  document.title = to.meta.title || defaultTitle
})

authStore.restoreSession().then(() => {
  const isLoggedIn = authStore.isAuthenticated
  const currentPath = window.location.pathname
  const savedPage = localStorage.getItem('current_page') 

 if (isLoggedIn && savedPage && currentPath === '/' || currentPath === '/landing') {
  router.replace(`/${savedPage}`)
}


  app.use(router)
  app.mount('#app')
})
