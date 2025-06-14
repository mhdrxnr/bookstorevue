// Stores/BookStore.js
import { defineStore } from 'pinia'
import { api } from '../axios'

export const useBookStore = defineStore('book', {
  state: () => ({
    books: [],
    isLoading: false
  }),
  actions: {
    async fetchBooks() {
      this.isLoading = true
      try {
        const res = await api.get('/books')
        // 👇 Check if books are inside res.data.data
        this.books = res.data.data || res.data
      } catch (err) {
        console.error('Error fetching books:', err)
      } finally {
        this.isLoading = false
      }
    }
  }
})
