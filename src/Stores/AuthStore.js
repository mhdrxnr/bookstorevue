// stores/authStore.js
import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { api, web } from '../axios' // make sure this path is correct
import { useFavoriteStore } from './FavoritesStore'
import router from '../router'

export const useAuthStore = defineStore('auth', () => {
  const showLogin = ref(false)
  const showRegister = ref(false)
  const isAuthenticated = ref(false)
  const showProfile = ref(false)
  const isLoading = ref(true)
  const currentPage = ref(localStorage.getItem('current_page') || 'landing')
  const token = ref(null)
 
  const user = reactive({
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
  })

  function setUser(userData) {
    Object.assign(user, {
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
    })
    localStorage.setItem('auth_user', JSON.stringify(user))
    localStorage.setItem('auth_token', token.value || '')
  }



async function restoreSession() {
  try {
    console.log('🌀 Trying to restore session...')
    console.log('✅ restoreSession complete:', isAuthenticated.value)
console.log('➡️ localStorage.current_page =', localStorage.getItem('current_page'))
    isLoading.value = true

    await web.get('/sanctum/csrf-cookie')
    const response = await api.get('/me')

    const userData = response.data
    const client = userData.client || {}

    setUser({
      user_id: userData.user_id,
      client_id: client?.client_id || null,
      firstName: client?.firstName || '',
      lastName: client?.lastName || '',
      email: userData.email || '',
      number: client?.number || '',
      address: client?.address || '',
      wilaya: client?.wilaya || '',
      imageUrl: client?.imageUrl || '',
      role: userData.role
    })

       isAuthenticated.value = true

    // ✅ Set currentPage based on role only if not already stored
    const savedPage = localStorage.getItem('current_page')
if (savedPage) {
  currentPage.value = savedPage
} else {
  currentPage.value = userData.role === 'admin' ? 'admin' : 'store'
  localStorage.setItem('current_page', currentPage.value)
}
  } catch (error) {
    console.warn('🚫 Not logged in:', error)
    isAuthenticated.value = false
    token.value = null
  } finally {
    isLoading.value = false
  }
}



  async function loginWithApi(email, password) {
    try {
      await web.get('/sanctum/csrf-cookie')
      const response = await api.post('/login', { email, password })
      const { user: userData, client, token: t } = response.data
      // token.value = t || ''
      setUser({
        user_id: userData.user_id,
        client_id: client?.client_id || null,
        firstName: client?.firstName || '',
        lastName: client?.lastName || '',
        email: userData.email,
        number: client?.number || '',
        address: client?.address || '',
        wilaya: client?.wilaya || '',
        imageUrl: client?.imageUrl || '',
        role: userData.role
      })
      isAuthenticated.value = true
         const favoriteStore = useFavoriteStore()
         await favoriteStore.fetchFavorites()
      currentPage.value = userData.role === 'admin' ? 'admin' : 'store'
      router.push('/' + currentPage.value)
      localStorage.setItem('current_page', currentPage.value)
      closePopup()
    } catch (error) {
      console.error('Login failed:', error)
      alert(error.response?.data?.message || 'Login failed. Please try again.')
    }
  }

  async function logout() {
    try {
      await api.post('/api/logout')
    } catch (error) {
      console.error('Logout failed:', error)
    }
    token.value = null
    Object.assign(user, {
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
    })
    isAuthenticated.value = false
    currentPage.value = 'landing'
    localStorage.removeItem('auth_user')
    localStorage.removeItem('auth_token')
    localStorage.removeItem('current_page')
    window.location.href = '/landing'
  }

  async function updateUser(userPayload) {
    if (!user.user_id) throw new Error('No user_id set')
    return api.put(`/users/${user.user_id}`, userPayload)
  }

  async function updateClient(payload) {
    if (!user.client_id) throw new Error('No client_id set')
    return api.post(`/clients/${user.client_id}?_method=PUT`, payload, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  }

  async function fetchUser() {
  isLoading.value = true
  try {
    // 1. Ensure CSRF cookie for Sanctum session auth
    await api.get('/sanctum/csrf-cookie')

    // 2. Use the correct route that loads favoriteBooks
    const response = await api.get('/me', { withCredentials: true })

    // 3. Assuming you still return user + client data
    const userData = response.data
    const client = userData.client || {}

    setUser({
      user_id: userData.user_id,
      client_id: client?.client_id || null,
      firstName: client?.firstName || '',
      lastName: client?.lastName || '',
      email: userData.email || '',
      number: client?.number || '',
      address: client?.address || '',
      wilaya: client?.wilaya || '',
      imageUrl: client?.imageUrl || '',
      role: userData.role,
      favorites: userData.favorite_books || [] // if returned here
    })

    isAuthenticated.value = true
  } catch (error) {
    console.error('fetchUser failed:', error)
    isAuthenticated.value = false
  } finally {
    isLoading.value = false
  }
}


  function toggleLogin() {
    showLogin.value = !showLogin.value
    if (showLogin.value) showRegister.value = false
  }
  function openLogin() {
    showLogin.value = true
    showRegister.value = false
  }
  function openRegister() {
    showLogin.value = false
    showRegister.value = true
  }
  function closePopup() {
    showLogin.value = false
    showRegister.value = false
  }
  function goToProfile() {
    currentPage.value = 'profile'
    localStorage.setItem('current_page', 'profile')
    router.push('/profile')
  }
  function goToStore() {
    currentPage.value = 'store'
    localStorage.setItem('current_page', 'store')
    router.push('/store')
  }
  function goToAdmin() {
    currentPage.value = 'admin'
    localStorage.setItem('current_page', 'admin')
    router.push('/admin')
  }
  function isAdmin() {
    return user.role === 'admin'
  }
  function isClient() {
    return user.role === 'client'
  }

  return {
    showLogin,
    showRegister,
    isAuthenticated,
    showProfile,
    isLoading,
    currentPage,
    token,
    user,
    setUser,
    restoreSession,
    loginWithApi,
    logout,
    updateUser,
    updateClient,
    fetchUser,
    toggleLogin,
    openLogin,
    openRegister,
    closePopup,
    goToProfile,
    goToStore,
    goToAdmin,
    isAdmin,
    isClient
  }
})
