import { reactive } from 'vue'
import api from '../axios'
import router from '../router'

export const authStore = reactive({
  showLogin: false,
  showRegister: false,
  isAuthenticated: false,
  showProfile: false,
  isLoading: true,
  currentPage: 'store',
  token: null,
  user: {
    firstName: 'first name here',
    lastName: 'last name here',
    email: 'exmp@gmail.com',
    number: '0655228877',
    address: 'your address',
    wilaya: 'city',
    imageUrl: '/src/assets/User_lightbig.png',
    role: 'client'
  },

  toggleLogin() {
    this.showLogin = !this.showLogin
    if (this.showLogin) this.showRegister = false
  },

  openLogin() {
    this.showLogin = true
    this.showRegister = false
  },

  openRegister() {
    this.showLogin = false
    this.showRegister = true
  },

  closePopup() {
    this.showLogin = false
    this.showRegister = false
  },

  login() {
    this.isAuthenticated = true
    this.currentPage = 'store'
    this.closePopup()
  },

  async loginWithApi(email, password) {
    try {
      await api.get('/sanctum/csrf-cookie')

      const response = await api.post('/api/login', { email, password })

      this.user = response.data.user
      this.isAuthenticated = true

      if (this.user.role === 'admin') {
        this.currentPage = 'admin'
        router.push('/admin')
      } else {
        this.currentPage = 'store'
        router.push('/store')
      }

      this.closePopup()
    } catch (error) {
      console.error('Login failed:', error)
      if (error.response?.status === 401) {
        alert('Incorrect credentials or account not found. Please create an account.')
      } else {
        alert(error.response?.data?.message || 'Login failed. Please try again.')
      }
    }
  },

  async logout() {
    try {
      await api.post('/api/logout')
    } catch (error) {
      console.error('Logout failed:', error)
    }
    this.token = null
    this.user = {}
    this.isAuthenticated = false
    this.currentPage = 'landing'
    window.location.href = '/landing'
  },

  goToProfile() {
    this.currentPage = 'profile'
    router.push('/profile')
  },

  goToStore() {
    this.currentPage = 'store'
    router.push('/store')
  },

  goToAdmin() {
    this.currentPage = 'admin'
    router.push('/admin')
  },

  isAdmin() {
    return this.user.role === 'admin'
  },

  isClient() {
    return this.user.role === 'client'
  },

  async fetchUser() {
    this.isLoading = true
    try {
      const response = await api.get('/api/user')
      this.user = response.data
      this.isAuthenticated = true
    } catch (error) {
      this.user = null
      this.isAuthenticated = false
    } finally {
      this.isLoading = false
    }
  }
})
