<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Admin Dashboard</h1>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-white shadow rounded-xl p-4">
        <h2 class="text-gray-500">Books</h2>
        <p class="text-2xl font-semibold">{{ stats.books }}</p>
      </div>
      <div class="bg-white shadow rounded-xl p-4">
        <h2 class="text-gray-500">Categories</h2>
        <p class="text-2xl font-semibold">{{ stats.categories }}</p>
      </div>
      <div class="bg-white shadow rounded-xl p-4">
        <h2 class="text-gray-500">Orders</h2>
        <p class="text-2xl font-semibold">{{ stats.orders }}</p>
      </div>
      <div class="bg-white shadow rounded-xl p-4">
        <h2 class="text-gray-500">Clients</h2>
        <p class="text-2xl font-semibold">{{ stats.clients }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from '../../axios' // adjust path as needed

const stats = ref({
  books: 0,
  categories: 0,
  orders: 0,
  clients: 0,
})

const fetchStats = async () => {
  try {
    const res = await api.get('/admin/stats')
    stats.value = res.data
  } catch (err) {
    console.error('Failed to load admin stats', err)
  }
}

onMounted(fetchStats)
</script>
