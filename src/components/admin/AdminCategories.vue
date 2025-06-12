<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const categories = ref([])
const newCategory = ref('')
const editingId = ref(null)
const editingName = ref('')

// Fetch categories on mount
const fetchCategories = async () => {
  try {
    const res = await axios.get('http://localhost:8000/api/categories', { withCredentials: true })
    categories.value = res.data
  } catch (err) {
    console.error('Failed to fetch categories:', err)
  }
}

// Add a new category
const addCategory = async () => {
  if (!newCategory.value) return
  try {
    const res = await axios.post(
      'http://localhost:8000/api/categories',
      { name: newCategory.value },
      { withCredentials: true }
    )
    categories.value.push(res.data)
    newCategory.value = ''
  } catch (err) {
    console.error('Add category error:', err)
  }
}

// Delete category
const deleteCategory = async (id) => {
  try {
    await axios.delete(`http://localhost:8000/api/categories/${id}`, { withCredentials: true })
    categories.value = categories.value.filter(c => c.category_id !== id)
  } catch (err) {
    console.error('Delete error:', err)
  }
}

// Start editing
const startEdit = (cat) => {
  editingId.value = cat.category_id
  editingName.value = cat.name
}

// Cancel editing
const cancelEdit = () => {
  editingId.value = null
  editingName.value = ''
}

// Save edit
const updateCategory = async () => {
  try {
    const res = await axios.put(
      `http://localhost:8000/api/categories/${editingId.value}`,
      { name: editingName.value },
      { withCredentials: true }
    )
    const idx = categories.value.findIndex(c => c.category_id === editingId.value)
    if (idx !== -1) categories.value[idx] = res.data
    cancelEdit()
  } catch (err) {
    console.error('Update error:', err)
  }
}

onMounted(fetchCategories)
</script>

<template>
  <div class="p-6 space-y-6">
    <h2 class="text-xl font-bold">Categories Management</h2>

    <!-- Add New -->
    <div class="flex gap-2">
      <input v-model="newCategory" placeholder="New Category" class="border px-2 py-1 rounded" />
      <button @click="addCategory" class="bg-green-500 text-white px-3 py-1 rounded">Add</button>
    </div>

    <!-- Category List -->
    <ul class="space-y-2">
      <li v-for="cat in categories" :key="cat.category_id" class="flex items-center gap-4">
        <div v-if="editingId === cat.category_id">
          <input v-model="editingName" class="border px-2 py-1 rounded" />
          <button @click="updateCategory" class="text-blue-600">Save</button>
          <button @click="cancelEdit" class="text-gray-500">Cancel</button>
        </div>
        <div v-else class="flex items-center gap-2">
          <span class="font-semibold">{{ cat.name }}</span>
          <button @click="startEdit(cat)" class="text-blue-600">Edit</button>
          <button @click="deleteCategory(cat.category_id)" class="text-red-600">Delete</button>
        </div>
      </li>
    </ul>
  </div>
</template>
