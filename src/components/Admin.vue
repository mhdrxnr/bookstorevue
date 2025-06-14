<template>
  <div class="flex">
    <AdminSidebar @switch="current = $event" @logout="handleLogout" />
    <div class="flex-1 p-4">
      <component :is="componentMap[current]" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../Stores/AuthStore'

import AdminSidebar from './admin/AdminSidebar.vue'
import AdminHome from './admin/AdminHome.vue'
import AdminBooks from './admin/AdminBooks.vue'
import AdminCategories from './admin/AdminCategories.vue'
import AdminOrders from './admin/AdminOrders.vue'
import AdminClients from './admin/AdminClients.vue'

// ✅ Correct way to use Pinia store
const authStore = useAuthStore()

// ✅ Redirect if not authenticated or not admin
onMounted(() => {
  if (!authStore.isAuthenticated || authStore.user?.role !== 'admin') {
    window.location.href = '/landing'
  }
})

// Section routing
const current = ref('home')
const componentMap = {
  home: AdminHome,
  books: AdminBooks,
  categories: AdminCategories,
  orders: AdminOrders,
  clients: AdminClients
}

// Logout and redirect
function handleLogout() {
  authStore.logout()
  window.location.href = '/landing'
}
</script>
