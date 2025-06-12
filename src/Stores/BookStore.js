// Stores/BookStore.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useBookStore = defineStore('book', {
  state: () => ({
    books: [],
    isLoading: false
  }),
  actions: {
    async fetchBooks() {
      this.isLoading = true
      try {
        const res = await axios.get('/books')
        this.books = res.data
      } catch (err) {
        console.error('Error fetching books:', err)
      } finally {
        this.isLoading = false
      }
    }
  }
})
