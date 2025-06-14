<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">Clients Management</h2>
    <table class="w-full table-auto border border-gray-300">
      <thead class="bg-gray-100">
        <tr>
          <th class="p-2 border">#</th>
          <th class="p-2 border">Image</th>
          <th class="p-2 border">Name</th>
          <th class="p-2 border">Number</th>
          <th class="p-2 border">Wilaya</th>
          <th class="p-2 border">Address</th>
          <th class="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(client, index) in clients" :key="client.client_id">
          <td class="p-2 border">{{ index + 1 }}</td>
          <td class="p-2 border">
            <img :src="client.image || fallbackImg" alt="client" class="w-10 h-10 rounded-full object-cover" />
          </td>
          <td class="p-2 border">{{ client.firstName }} {{ client.lastName }}</td>
          <td class="p-2 border">{{ client.number }}</td>
          <td class="p-2 border">{{ client.wilaya }}</td>
          <td class="p-2 border">{{ client.address }}</td>
          <td class="p-2 border">
            <button @click="editClient(client)" class="text-blue-500 hover:underline mr-2">Edit</button>
            <button @click="deleteClient(client.client_id)" class="text-red-500 hover:underline">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Edit Form Modal -->
    <div v-if="showEdit" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-xl shadow-md w-full max-w-lg">
        <h3 class="text-lg font-semibold mb-4">Edit Client</h3>
        <form @submit.prevent="submitEdit">
          <div class="grid grid-cols-2 gap-4">
            <input v-model="editData.firstName" type="text" placeholder="First Name" class="input" />
            <input v-model="editData.lastName" type="text" placeholder="Last Name" class="input" />
            <input v-model="editData.number" type="text" placeholder="Phone Number" class="input" />
            <input v-model="editData.wilaya" type="text" placeholder="Wilaya" class="input" />
          </div>
          <textarea v-model="editData.address" placeholder="Address" class="w-full border mt-2 p-2 rounded"></textarea>

          <div class="flex justify-end mt-4">
            <button @click="showEdit = false" type="button" class="mr-2">Cancel</button>
            <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from '../../axios'
import { useAuthStore } from '../../Stores/AuthStore'
const authStore = useAuthStore()
const clients = ref([])
const showEdit = ref(false)
const editData = ref({})
const fallbackImg = '/default-user.png' // Replace with your default image path

async function fetchClients() {
  try {
    const res = await api.get('/clients')
    clients.value = res.data
  } catch (err) {
    console.error('Failed to load clients:', err)
  }
}

function editClient(client) {
  editData.value = { ...client }
  showEdit.value = true
}

async function submitEdit() {
  try {
    const formData = new FormData()
    formData.append('firstName', editData.value.firstName)
    formData.append('lastName', editData.value.lastName)
    formData.append('number', editData.value.number)
    formData.append('wilaya', editData.value.wilaya)
    formData.append('address', editData.value.address)

    // 🔥 Only send image if it's a File (not a URL string)
    if (editData.value.image && typeof editData.value.image !== 'string') {
      formData.append('image', editData.value.image)
    }

    const res = await api.post(`/clients/${editData.value.client_id}?_method=PUT`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    const index = clients.value.findIndex(c => c.client_id === editData.value.client_id)
    if (index !== -1) clients.value[index] = res.data.client
    if (authStore.user.client_id === res.data.client.client_id) {
      authStore.user = { ...authStore.user, ...res.data.client }
    }
    showEdit.value = false
  } catch (err) {
    console.error('Update failed:', err)
  }
}

async function deleteClient(id) {
  if (!confirm('Are you sure you want to delete this client?')) return
  try {
    await api.delete(`/clients/${id}`)
    clients.value = clients.value.filter(c => c.client_id !== id)
  } catch (err) {
    console.error('Delete failed:', err)
  }
}

onMounted(fetchClients)
</script>

<style scoped>
.input {
  border: 1px solid #000000;
  padding: 2px;
  border-radius: 4px;
}
</style>
