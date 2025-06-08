// Stores/FavoriteStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFavoriteStore = defineStore('favorites', () => {
  const favorites = ref([])

  function toggleFavorite(book) {
    const index = favorites.value.findIndex(b => b.id === book.id)
    if (index !== -1) {
      favorites.value.splice(index, 1)
    } else {
      favorites.value.push({ ...book }) // copy to prevent mutation
    }
  }

  function isFavorite(bookId) {
    return favorites.value.some(b => b.id === bookId)
  }

  return { favorites, toggleFavorite, isFavorite }
})
