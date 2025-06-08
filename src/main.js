

import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import router from './router'
import axios from 'axios'
import { createPinia } from 'pinia'
axios.defaults.baseURL = 'http://localhost:8000/api/';

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

app.mount('#app')