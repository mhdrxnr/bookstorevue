
import { defineStore } from 'pinia'
import axios from 'axios'
export const useFavoriteStore = defineStore('favorites', {
  state: () => ({
    favorites: new Set(), // ← using Set is faster for lookups
  }),

  actions: {
    async fetchFavorites() {
      try {
        const res = await axios.get('/books/favorites', { withCredentials: true })
        this.favorites = new Set(res.data.map(book => book.book_id))
      } catch (err) {
        console.error('Failed to load favorites:', err)
      }
    },

    isFavorite(bookId) {
      return this.favorites.has(bookId)
    },

    async toggleFavorite(book) {
      try {
        await axios.get('http://localhost:8000/sanctum/csrf-cookie')
        if (this.isFavorite(book.book_id)) {
          await axios.delete(`/book/${book.book_id}/favorite`, { withCredentials: true })
          this.favorites.delete(book.book_id)
        } else {
          await axios.post(`/book/${book.book_id}/favorite`, {}, { withCredentials: true })
          this.favorites.add(book.book_id)
        }
      } catch (err) {
        console.error('Error toggling favorite:', err.response?.data || err.message)
      }
    }
  }
})
