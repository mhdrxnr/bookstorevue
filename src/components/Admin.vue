<template>
  <div class="flex">
    <AdminSidebar @switch="current = $event" @logout="handleLogout" />
    <div class="flex-1 p-4">
      <component :is="componentMap[current]" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AdminSidebar from './admin/AdminSidebar.vue'
import AdminHome from './admin/AdminHome.vue'
import AdminBooks from './admin/AdminBooks.vue'
import AdminCategories from './admin/AdminCategories.vue'
import AdminOrders from './admin/AdminOrders.vue'
import AdminClients from './admin/AdminClients.vue'

import { authStore } from '../Stores/AuthStore';
import { onMounted } from 'vue';


onMounted(() => {
  if (!authSotre.isAuthenticated || authStore.user.role !== 'admin') {
    window.location.href = '/'; // redirect to home if not admin
  }
});

const current = ref('home')
const componentMap = {
  home: AdminHome,
  books: AdminBooks,
  categories: AdminCategories,
  orders: AdminOrders,
  clients: AdminClients
}

function handleLogout() {
  authStore.logout()  // call the logout method in authStore
  window.location.href = '/'  // redirect to landing or login page after logout
}
</script>