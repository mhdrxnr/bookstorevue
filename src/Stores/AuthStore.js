import { reactive } from 'vue'
import api from '../axios'
import router from '../router'

export const authStore = reactive({
  showLogin: false,
  showRegister: false,
  isAuthenticated: false,
  showProfile: false,
  isLoading: true,
  currentPage: localStorage.getItem('current_page') || 'landing',
  token: null,
  user: {
    user_id: null,
    client_id: null,
    firstName: '',
    lastName: '',
    email: '',
    number: '',
    address: '',
    wilaya: '',
    imageUrl: '',
    role: 'client'
  },

  async restoreSession() {
  try {
    await api.get('/sanctum/csrf-cookie') // Always safe to refresh cookie
    const response = await api.get('/api/me') // ✅ call backend to get real user session

    const user = response.data
    const client = user.client || {}

    this.setUser({
      user_id: user.user_id,
      client_id: client.client_id || null,
      firstName: client.firstName || '',
      lastName: client.lastName || '',
      email: user.email || '',
      number: client.number || '',
      address: client.address || '',
      wilaya: client.wilaya || '',
      imageUrl: client.imageUrl || '',
      role: user.role
    })

    this.isAuthenticated = true
    const storedPage = localStorage.getItem('current_page')
    if (storedPage) {
      this.currentPage = storedPage
      router.push('/' + storedPage)
    }
  } catch (error) {
    console.warn('Session restore failed:', error)
    this.isAuthenticated = false
    this.token = null
    localStorage.removeItem('auth_user')
    localStorage.removeItem('auth_token')
    localStorage.removeItem('current_page')
    this.currentPage = 'landing'
    router.push('/landing')
  }
},


  setUser(userData) {
    this.user = {
      user_id: userData.user_id,
      client_id: userData.client_id,
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      email: userData.email || '',
      number: userData.number || '',
      address: userData.address || '',
      wilaya: userData.wilaya || '',
      imageUrl: userData.imageUrl || '',
      role: userData.role || 'client'
    }

    localStorage.setItem('auth_user', JSON.stringify(this.user))
    localStorage.setItem('auth_token', this.token || '')
  },

  async loginWithApi(email, password) {
    try {
      await api.get('/sanctum/csrf-cookie')
      const response = await api.post('/api/login', { email, password })

      const user = response.data.user
      const client = response.data.client

      this.token = response.data.token || ''
      this.setUser({
        user_id: user.user_id,
        client_id: client?.client_id || null,
        firstName: client?.firstName || '',
        lastName: client?.lastName || '',
        email: user.email,
        number: client?.number || '',
        address: client?.address || '',
        wilaya: client?.wilaya || '',
        imageUrl: client?.imageUrl || '',
        role: user.role
      })

      this.isAuthenticated = true

      if (this.user.role === 'admin') {
        this.currentPage = 'admin'
        router.push('/admin')
      } else {
        this.currentPage = 'store'
        router.push('/store')
      }
      localStorage.setItem('current_page', this.currentPage)
      this.closePopup()
    } catch (error) {
      console.error('Login failed:', error)
      alert(error.response?.data?.message || 'Login failed. Please try again.')
    }
  },

  async updateUser(userPayload) {
    if (!this.user.user_id) throw new Error('No user_id set')
    return api.put(`/api/users/${this.user.user_id}`, userPayload)
  },

  async updateClient(payload) {
    if (!this.user.client_id) throw new Error('No client_id set')
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' }
    }
    return api.post(`/api/clients/${this.user.client_id}?_method=PUT`, payload, config)
  },

  async logout() {
    try {
      await api.post('/api/logout')
    } catch (error) {
      console.error('Logout failed:', error)
    }
    this.token = null
    this.user = {
      user_id: null,
      client_id: null,
      firstName: '',
      lastName: '',
      email: '',
      number: '',
      address: '',
      wilaya: '',
      imageUrl: '',
      role: 'client'
    }
    this.isAuthenticated = false
    this.currentPage = 'landing'
    localStorage.removeItem('auth_user')
    localStorage.removeItem('auth_token')
    localStorage.removeItem('current_page')
    window.location.href = '/landing'
  },

  async fetchUser() {
  this.isLoading = true
  try {
    const response = await api.get('/api/user')
    const user = response.data.user
    const client = response.data.client

    if (user && client) {
      this.setUser({
        user_id: user.user_id,
        client_id: client?.client_id || null,
        firstName: client?.firstName || '',
        lastName: client?.lastName || '',
        email: user.email || '',
        number: client?.number || '',
        address: client?.address || '',
        wilaya: client?.wilaya || '',
        imageUrl: client?.imageUrl || '',
        role: user.role
      })
      this.isAuthenticated = true // ✅ make sure this is set
    } else {
      this.user = null
      this.isAuthenticated = false
    }
  } catch (error) {
    console.error('fetchUser failed', error)
    this.user = null
    this.isAuthenticated = false
  } finally {
    this.isLoading = false
  }
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
  goToProfile() {
    this.currentPage = 'profile'
    localStorage.setItem('current_page', 'profile')
    router.push('/profile')
  },
  goToStore() {
    this.currentPage = 'store'
    localStorage.setItem('current_page', 'store')
    router.push('/store')
  },
  goToAdmin() {
    this.currentPage = 'admin'
    localStorage.setItem('current_page', 'admin')
    router.push('/admin')
  },
  isAdmin() {
    return this.user.role === 'admin'
  },
  isClient() {
    return this.user.role === 'client'
  }
})
