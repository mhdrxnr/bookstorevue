import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),
  getters: {
    totalPrice(state) {
      return state.items.reduce((total, item) => total + item.price * item.quantity, 0)
    }
  },
  actions: {
    addToCart(book) {
      const existing = this.items.find(item => item.id === book.id)
      if (existing) {
        existing.quantity++
      } else {
        this.items.push({ ...book, quantity: 1 })
      }
    },
    removeFromCart(bookId) {
      this.items = this.items.filter(item => item.id !== bookId)
    },
    updateQuantity(bookId, qty) {
      const item = this.items.find(item => item.id === bookId)
      if (item && qty > 0) item.quantity = qty
    }
  }
})
