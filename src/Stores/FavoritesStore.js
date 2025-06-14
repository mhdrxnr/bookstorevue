import { defineStore } from 'pinia'
import { api, web } from '../axios'

export const useFavoriteStore = defineStore('favorites', {
  state: () => ({
    favorites: [],             // ← array of book objects
    favoriteIds: new Set()     // ← Set of book IDs for fast lookup
  }),

  actions: {
    async fetchFavorites() {
      try {
        const res = await api.get('/books/favorites', { withCredentials: true })
        this.favorites = res.data
        this.favoriteIds = new Set(res.data.map(book => book.book_id))
      } catch (err) {
        console.error('Failed to load favorites:', err)
      }
    },

    isFavorite(bookId) {
      return this.favoriteIds.has(bookId)
    },

    async toggleFavorite(book, userId) {
  try {
    await web.get('/sanctum/csrf-cookie')

    if (this.isFavorite(book.book_id)) {
      await api.delete(`/books/${book.book_id}/favorite`, {
        data: { user_id: userId },
        withCredentials: true,
      })
      this.favorites.delete(book.book_id)
    } else {
      await api.post(`/books/${book.book_id}/favorite`, { user_id: userId }, {
        withCredentials: true,
      })
      this.favorites.add(book.book_id)
    }
  } catch (err) {
    console.error('Error toggling favorite:', err.response?.data || err.message)
  }
}

  }
})
