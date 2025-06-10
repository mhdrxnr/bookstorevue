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

  setUser(userData) {
    console.log('Setting user:', userData)
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
  },

  async loginWithApi(email, password) {
    try {
      await api.get('/sanctum/csrf-cookie')
      const response = await api.post('/api/login', { email, password })

      const user = response.data.user
      const client = response.data.client

      this.setUser({
        user_id: user.user_id,
        client_id: client?.client_id || null,
        firstName: client?.firstName || '',
        lastName: client?.lastName ||  '',
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
  async updateUser(userPayload) {
  if (!this.user.user_id) throw new Error('No user_id set')
  return api.put(`/api/users/${this.user.user_id}`, userPayload)
},

async updateClient(payload) {
  if (!this.user.client_id) throw new Error('No client_id set')

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
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
    window.location.href = '/landing'
  },

  async fetchUser() {
  this.isLoading = true
  try {
    const response = await api.get('/api/user')
    // If response.data has user and client objects
    if (response.data.user && response.data.client) {
      this.setUser({
        user_id: response.data.user.user_id,
        client_id: response.data.client?.client_id || null,
        firstName: response.data.client?.firstName || '',
        lastName: response.data.client?.lastName || '',
        email: response.data.user.email || '',
        number: response.data.client?.number || '',
        address: response.data.client?.address || '',
        wilaya: response.data.client?.wilaya || '',
        imageUrl: response.data.client?.imageUrl || '',
        role: response.data.user.role
      })
    } else {
      // fallback for flat structure
      this.setUser(response.data)
    }
    this.isAuthenticated = true
  } catch (error) {
    this.user = null
    this.isAuthenticated = false
  } finally {
    this.isLoading = false
  }
},

  // UI helpers
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
  }
})
