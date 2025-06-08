<template>
  <div class="w-64 bg-gray-800 min-h-screen text-white p-4">
    <h1 class="text-2xl font-bold mb-6">Admin</h1>
    <ul class="space-y-2">
      <li><button @click="$emit('switch', 'home')" class="w-full text-left hover:bg-gray-700 px-3 py-2 rounded">Dashboard</button></li>
      <li><button @click="$emit('switch', 'books')" class="w-full text-left hover:bg-gray-700 px-3 py-2 rounded">Books</button></li>
      <li><button @click="$emit('switch', 'categories')" class="w-full text-left hover:bg-gray-700 px-3 py-2 rounded">Categories</button></li>
      <li><button @click="$emit('switch', 'orders')" class="w-full text-left hover:bg-gray-700 px-3 py-2 rounded">Orders</button></li>
      <li><button @click="$emit('switch', 'clients')" class="w-full text-left hover:bg-gray-700 px-3 py-2 rounded">Clients</button></li>
      <li><button @click="$emit('logout')" class="w-full text-left hover:bg-red-700 px-3 py-2 rounded mt-6">Logout</button></li>
    </ul>
  </div>
</template>