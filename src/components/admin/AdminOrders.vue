<script setup>
import { ref, onMounted } from 'vue'
import { api } from '../../axios'

const orders = ref([])
const selectedOrder = ref(null)
const orderDetails = ref([])
const showModal = ref(false)

const statuses = ['pending', 'completed', 'canceled']
const clientInfo = ref(null)

async function fetchClientInfo(orderID) {
  try {
    const res = await api.get(`/orders/${orderID}/client`)
    clientInfo.value = res.data
    alert(`👤 ${res.data.firstName} ${res.data.lastName}\n📞 ${res.data.number}\n🏠 ${res.data.address}, ${res.data.wilaya}`)
  } catch (err) {
    console.error('❌ Failed to fetch client info:', err)
    alert('❌ Could not load client information')
  }
}

// Fetch all orders (admin only)
async function fetchOrders() {
  try {
    const res = await api.get('/allOrders')
    orders.value = res.data
  } catch (err) {
    console.error('❌ Failed to fetch orders:', err)
  }
}

// View order details
async function viewDetails(order) {
  selectedOrder.value = order
  try {
    const res = await api.get(`/orders/${order.order_id}`)
    orderDetails.value = res.data
    showModal.value = true
  } catch (err) {
    console.error('❌ Failed to fetch order details:', err)
  }
}

// Update order status
async function updateStatus(order, newStatus) {
  try {
    await api.put(`/orders/${order.order_id}`, { status: newStatus })
    order.status = newStatus
    alert('✅ Status updated')
  } catch (err) {
    console.error('❌ Failed to update status:', err)
    alert('❌ Failed to update status')
  }
}

// Delete order
async function deleteOrder(orderID) {
  if (!confirm('Are you sure you want to delete this order?')) return
  try {
    await api.delete(`/orders/${orderID}`)
    orders.value = orders.value.filter(o => o.order_id !== orderID)
    alert('🗑️ Order deleted')
  } catch (err) {
    console.error('❌ Failed to delete order:', err)
    alert('❌ Failed to delete order')
  }
}

onMounted(fetchOrders)
</script>

<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">📦 Orders Management</h2>

    <table class="w-full border-collapse">
      <thead>
        <tr class="bg-gray-200 text-left">
          <th class="p-2">ID</th>
          <th class="p-2">User ID</th>
          <th class="p-2">Total Price</th>
          <th class="p-2">Status</th>
          <th class="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.order_id" class="border-t">
          <td class="p-2">{{ order.order_id }}</td>
          <td class="p-2">
            <button @click="fetchClientInfo(order.order_id)" class="text-blue-600 underline">
                {{ order.userID }}
            </button>
          </td>

          <td class="p-2">{{ order.totalPrice }} DA</td>
          <td class="p-2">
            <select v-model="order.status" @change="updateStatus(order, order.status)" class="border p-1 rounded">
              <option v-for="s in statuses" :key="s" :value="s">{{ s }}</option>
            </select>
          </td>
          <td class="p-2 flex gap-2">
            <button @click="viewDetails(order)" class="bg-blue-500 text-white px-2 py-1 rounded">View</button>
            <button @click="deleteOrder(order.order_id)" class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal for order details -->
    <div v-if="showModal" class="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div class="bg-white p-6 rounded shadow-lg w-[600px] relative">
        <button @click="showModal = false" class="absolute top-2 right-2 text-xl">×</button>
        <h3 class="text-xl font-bold mb-4">📖 Order #{{ selectedOrder.order_id }} Details</h3>
        <ul>
          <li v-for="book in orderDetails.books" :key="book.book_id" class="mb-2 border-b pb-2">
            <p class="font-semibold">📘 {{ book.title }}</p>
            <p>Quantity: {{ book.pivot.quantity }}</p>
            <p>Unit Price: {{ book.pivot.unitPrice }} DA</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
select {
  background: white;
}
</style>
