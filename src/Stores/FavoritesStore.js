import { defineStore } from 'pinia'
import { api, web } from '../axios'

export const useFavoriteStore = defineStore('favorites', {
  state: () => ({
    favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
    favoriteIds: new Set(JSON.parse(localStorage.getItem('favoriteIds') || '[]')),
  }),

  actions: {
    saveToLocalStorage() {
      localStorage.setItem('favorites', JSON.stringify(this.favorites))
      localStorage.setItem('favoriteIds', JSON.stringify(Array.from(this.favoriteIds)))
    },

    async fetchFavorites() {
      try {
        const res = await api.get('/books/favorites', { withCredentials: true })
        this.favorites = res.data
        this.favoriteIds = new Set(res.data.map(book => book.book_id))
        this.saveToLocalStorage()
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

        const isFav = this.isFavorite(book.book_id)

        if (isFav) {
          await api.delete(`/books/${book.book_id}/favorite`, {
            data: { user_id: userId },
            withCredentials: true,
          })
          this.favoriteIds.delete(book.book_id)
          this.favorites = this.favorites.filter(b => b.book_id !== book.book_id)
        } else {
          await api.post(`/books/${book.book_id}/favorite`, { user_id: userId }, {
            withCredentials: true,
          })
          this.favoriteIds.add(book.book_id)
          this.favorites.push(book)
        }

        this.saveToLocalStorage()

      } catch (err) {
        console.error('Error toggling favorite:', err.response?.data || err.message)
      }
    }
  }
})
