import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import router from './router'
import axios from 'axios'
import { createPinia } from 'pinia'
import { authStore } from './Stores/AuthStore'

axios.defaults.baseURL = 'http://localhost:8000/api/'
axios.defaults.withCredentials = true

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)

const store = authStore

// Detect route on refresh and set currentPage
const path = window.location.pathname
if (path.includes('/store')) store.currentPage = 'store'
else if (path.includes('/profile')) store.currentPage = 'profile'
else if (path.includes('/admin')) store.currentPage = 'admin'
else store.currentPage = 'landing'

localStorage.setItem('current_page', store.currentPage)

store.restoreSession()

app.use(router)
app.mount('#app')
