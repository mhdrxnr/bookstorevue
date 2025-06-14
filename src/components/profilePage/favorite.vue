<script setup>
import { ref } from 'vue'
import BookPopUp from '../storePage/BookPopUp.vue'
import { useFavoriteStore } from '../../Stores/FavoritesStore.js'
import { useCartStore } from '../../Stores/CartStore.js'
import { useAuthStore } from '../../Stores/AuthStore.js'

function formatImage(image) {
  if (!image) return 'https://via.placeholder.com/264x268?text=No+Image'
  if (image.startsWith('http')) return image
  return `http://localhost:8000/storage/${image}`
}


const favoriteStore = useFavoriteStore()
const cartStore = useCartStore()
const authStore = useAuthStore()
const selectedBook = ref(null)
const showPopup = ref(false)

function openBookPopup(book) {
  selectedBook.value = book
  showPopup.value = true
}

function closePopup() {
  showPopup.value = false
  selectedBook.value = null
}


  

function handleAddToCart() {
  if (!selectedBook.value || !selectedBook.value.id) {
    alert("Invalid book.")
    return
  }

  const existing = cartStore.items.find(item => item.id === selectedBook.value.id)

  cartStore.addToCart(selectedBook.value)

  if (existing) {
    alert("📦 Book quantity increased in the cart.")
  } else {
    alert("✅ Book added to cart!")
  }
}

function toggleLike(book) {
  const userId = authStore.user?.user_id
  if (!userId) {
    alert("🔒 You need to log in to manage favorites.")
    return
  }

  favoriteStore.toggleFavorite(book, userId)
}


</script>

<template>
<BookPopUp
    :show="showPopup"
    :book="selectedBook"
    @close="closePopup"
    @add-to-cart="handleAddToCart"
  />
 <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-[25px]">
      <div
        v-for="book in favoriteStore.favorites"
        :key="book.id"
        class="p-[5px] relative bg-warm-beige w-[274px] h-[380px] rounded-[4px] cursor-pointer"
        @click="openBookPopup(book)"
      >
        <div
          :style="{ backgroundImage: `url(${formatImage(book.image)})` }"
          class="bg-center bg-cover w-[264px] h-[268px] rounded-[4px]"
        ></div>

        <div class="flex">
          <div class="flex h-[107px] justify-center flex-col gap-[10px]">
            <h1 class="cairo-regular text-soft-shadow font-bold text-[16px]">
              {{ book.title }}
            </h1>
            <h3 class="cairo-regular text-soft-shadow text-[14px]">
              {{ book.author }}
            </h3>
            <h3 class="cairo-regular text-soft-shadow font-bold text-[14px]">
              {{ book.price + '.00da' }}
            </h3>
          </div>

          <button
            @click.stop="toggleLike(book)"
            class="cursor-pointer absolute bottom-[5%] right-[7%]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="31"
              height="29"
              fill="none"
            >
              <path
                :stroke="favoriteStore.isFavorite(book.book_id) ? '#FF3535' : '#3D4A42'"
                :fill="favoriteStore.isFavorite(book.book_id) ? '#FF3535' : 'none'"
                stroke-width="2"
                d="M22.75 1c-3.69 0-6.371 2.6-7.25 3.9C14.621 3.6 11.81 1 7.59 1 2.319 1 1 4.9 1 9.45 1 14 10.667 22.883 15.5 27 20.114 23.1 30 14 30 9.45 30 4.21 27.364 1 22.75 1Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

</template>