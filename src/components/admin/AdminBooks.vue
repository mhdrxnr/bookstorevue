<template>
  <div class="p-6">
    <h2 class="text-xl font-bold mb-4">Books Management</h2>

    <!-- Add Book Form -->
    <form @submit.prevent="createBook" class="mb-6 grid grid-cols-2 gap-4">
      <input v-model="newBook.title" type="text" placeholder="Title (min 10 chars)" class="border p-2" required />
      <input v-model="newBook.author" type="text" placeholder="Author (min 10 chars)" class="border p-2" required />
      <input v-model="newBook.price" type="number" placeholder="Price (>= 0)" class="border p-2" required />
      <input type="file" @change="handleNewBookImage" class="border p-2" />

      <select v-model="newBook.categoryID" class="border p-2" required>
        <option disabled value="">Select Category</option>
        <option v-for="category in categories" :key="category.category_id" :value="category.category_id">
          {{ category.name }}
        </option>
      </select>

      <textarea v-model="newBook.description" placeholder="Description (min 30 chars)" class="border p-2" rows="3"></textarea>

      <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded col-span-2">Add Book</button>
    </form>

    <!-- Book List -->
    <table class="min-w-full table-auto border border-gray-200">
      <thead>
        <tr class="bg-gray-100 text-left">
          <th class="px-4 py-2 border">ID</th>
          <th class="px-4 py-2 border">Title</th>
          <th class="px-4 py-2 border">Author</th>
          <th class="px-4 py-2 border">category</th>
          <th class="px-4 py-2 border">Price</th>
          <th class="px-4 py-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in books" :key="book.book_id" class="hover:bg-gray-50">
          <td class="px-4 py-2 border">{{ book.book_id }}</td>
          <td class="px-4 py-2 border">{{ book.title }}</td>
          <td class="px-4 py-2 border">{{ book.author }}</td>
          <td class="px-4 py-2 border">{{ book.category?.name || 'N/A' }}</td>
          <td class="px-4 py-2 border">{{ book.price }} DA</td>
          <td class="px-4 py-2 border">
            <button class="text-blue-500 hover:underline mr-2" @click="openEditModal(book)">Edit</button>
            <button class="text-red-500 hover:underline" @click="deleteBook(book.book_id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Edit Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded w-full max-w-lg shadow-lg">
        <h3 class="text-lg font-bold mb-4">Edit Book</h3>
        <form @submit.prevent="updateBook" class="grid grid-cols-2 gap-4">
          <input v-model="editingBook.title" type="text" placeholder="Title" class="border p-2" required />
          <input v-model="editingBook.author" type="text" placeholder="Author" class="border p-2" required />
          <input v-model="editingBook.price" type="number" placeholder="Price" class="border p-2" required />
          <input type="file" @change="handleEditBookImage" class="border p-2" />

          <select v-model="editingBook.categoryID" class="border p-2" required>
            <option disabled value="">Select Category</option>
            <option v-for="category in categories" :key="category.category_id" :value="category.category_id">
              {{ category.name }}
            </option>
          </select>

          <textarea v-model="editingBook.description" class="border p-2 col-span-2" rows="3" placeholder="Description"></textarea>

          <div class="col-span-2 flex justify-end gap-2 mt-4">
            <button type="button" class="bg-gray-300 px-4 py-2 rounded" @click="showEditModal = false">Cancel</button>
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../../axios'

const bookErrors = ref({})

const books = ref([])
const categories = ref([])

const newBook = ref({
  title: '',
  author: '',
  price: 0,
  description: '',
  categoryID: '',
  image: ''
})

const editingBook = ref(null)
const showEditModal = ref(false)

const fetchBooks = async () => {
  try {
    const res = await api.get('/api/books')
    books.value = res.data
  } catch (err) {
    console.error('Failed to fetch books:', err)
  }
}

const fetchCategories = async () => {
  try {
    const res = await api.get('/api/categories')
    categories.value = res.data
  } catch (err) {
    console.error('Failed to fetch categories:', err)
  }
}

const newBookImage = ref(null)
const editBookImage = ref(null)

const handleNewBookImage = (e) => newBookImage.value = e.target.files[0]
const handleEditBookImage = (e) => editBookImage.value = e.target.files[0]



const createBook = async () => {
  try {
    const formData = new FormData()
    formData.append('title', newBook.value.title)
    formData.append('author', newBook.value.author)
    formData.append('price', newBook.value.price)
    formData.append('description', newBook.value.description)
    formData.append('categoryID', newBook.value.categoryID)
    if (newBookImage.value) {
  formData.append('image', newBookImage.value)
}


    const res = await api.post('/api/books', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    books.value.push(res.data)
    newBook.value = { title: '', author: '', price: 0, description: '', categoryID: '', image: '' }
    newBookImage.value = null
  } catch (err) {
  if (err.response && err.response.status === 422) {
    const errors = err.response.data.errors
    bookErrors.value = errors

    if (errors.title && errors.title[0].includes('already')) {
      alert('A book with this title already exists!')
    } else {
      alert('Validation failed. Please check your inputs.')
    }

  } else {
    alert('Error adding book: ' + (err.message || 'Unknown error'))
  }
}
}


const deleteBook = async (id) => {
  if (!confirm('Are you sure you want to delete this book?')) return

  try {
    await api.delete(`/api/books/${id}`)
    books.value = books.value.filter(book => book.book_id !== id)
  } catch (err) {
    console.error('Failed to delete book:', err)
  }
}

const openEditModal = (book) => {
  editingBook.value = { ...book }
  showEditModal.value = true
}

const updateBook = async () => {
  try {
    const formData = new FormData()
    formData.append('title', editingBook.value.title)
    formData.append('author', editingBook.value.author)
    formData.append('price', editingBook.value.price)
    formData.append('description', editingBook.value.description)
    formData.append('categoryID', editingBook.value.categoryID)

    if (editBookImage.value) {
      formData.append('image', editBookImage.value)
    }

    const res = await api.post(`/api/books/${editingBook.value.book_id}?_method=PUT`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    console.log('Updated book:', res.data)

    const index = books.value.findIndex(b => b.book_id === editingBook.value.book_id)
    if (index !== -1) books.value[index] = res.data
    showEditModal.value = false
  } catch (err) {
    alert('Error updating book: ' + JSON.stringify(err?.response?.data?.errors || err.message || err))
  }
}



onMounted(() => {
  fetchBooks()
  fetchCategories()
})
</script>
