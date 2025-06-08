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
const stats = {
  books: 120,
  categories: 8,
  orders: 45,
  clients: 30,
}
</script>