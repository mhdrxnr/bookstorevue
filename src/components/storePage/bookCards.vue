<script setup>
import { ref, computed, onMounted, defineProps, watchEffect } from 'vue'
import axios from 'axios'
import { useCartStore } from '../../Stores/CartStore.js'
import { useFavoriteStore } from '../../Stores/FavoritesStore.js'
import BookPopUp from './BookPopUp.vue'

const props = defineProps({
  selectedCategory: {
    type: String,
    default: 'All'
  },
  search: {
    type: String,
    default: ''
  }
})


const allBooks = ref([])
const selectedBook = ref(null)
const showPopup = ref(false)
const cart = useCartStore()
const favoriteStore = useFavoriteStore()
const currentPage = ref(1)
const booksPerPage = 40

// Fetch books from API
async function fetchBooks() {
  try {
    const res = await axios.get('/books')
    allBooks.value = res.data
  } catch (error) {
    console.error("Failed to fetch books:", error)
  }
}


onMounted(async () => {
  await favoriteStore.fetchFavorites()
  await fetchBooks()
})

watchEffect(() => {
  allBooks.value.forEach(book => {
    book.liked = favoriteStore.isFavorite(book.book_id)
  })
})


// Filtering based on category
const filteredBooks = computed(() => {
  let books = props.selectedCategory === 'All'
    ? allBooks.value
    : allBooks.value.filter(book => book.category?.name === props.selectedCategory)

  if (props.search.trim()) {
    const keyword = props.search.toLowerCase()
    books = books.filter(book =>
      book.title?.toLowerCase().includes(keyword) ||
      book.author?.toLowerCase().includes(keyword)
    )
  }

  return books
})



const totalPages = computed(() => Math.ceil(filteredBooks.value.length / booksPerPage))

const displayedBooks = computed(() => {
  const start = (currentPage.value - 1) * booksPerPage
  return filteredBooks.value.slice(start, start + booksPerPage)
})

function openBookPopup(book) {
  selectedBook.value = book
  showPopup.value = true
}

function closePopup() {
  showPopup.value = false
}

const toggleLike = async (book) => {
  await favoriteStore.toggleFavorite(book)
}




function handleAddToCart() {
  if (!selectedBook.value || !selectedBook.value.id) return
  const existing = cart.items.find(item => item.id === selectedBook.value.id)
  cart.addToCart(selectedBook.value)
  alert(existing ? "📦 Book quantity increased in the cart." : "✅ Book added to cart!")
}

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const paginationRange = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const delta = 1
  const range = []
  const rangeWithDots = []

  for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
    range.push(i)
  }

  if (current - delta > 2) rangeWithDots.push('...')
  rangeWithDots.unshift(1)
  rangeWithDots.push(...range)
  if (current + delta < total - 1) rangeWithDots.push('...')
  if (total > 1) rangeWithDots.push(total)

  return rangeWithDots
})
</script>

<template>
  <div class="container flex flex-col items-center mx-auto">
    <BookPopUp
      :show="showPopup"
      :book="selectedBook"
      @close="closePopup"
      @add-to-cart="handleAddToCart"
    />

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[25px]">
      <div
        v-for="book in displayedBooks"
        :key="book.book_id"
        class="p-[5px] relative bg-warm-beige w-[274px] h-[380px] rounded-[4px] cursor-pointer"
        @click="openBookPopup(book)"
      >
        <div
  :style="{
    backgroundImage: `url(${
      book.image
        ? 'http://localhost:8000/storage/' + book.image
        : 'https://via.placeholder.com/264x268?text=No+Image'
    })`
  }"
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
              {{ book.price + 'DA' }}
            </h3>
          </div>

          <button
            @click.stop="toggleLike(book)"
            class="cursor-pointer absolute bottom-[5%] right-[7%]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="31" height="29" fill="none">
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

    <div class="flex justify-center items-center mt-8 gap-2">
      <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none">
          <path fill="#2F2F2F" d="m9.781 16.25 7 7L15 25 5 15 15 5l1.781 1.75-7 7H25v2.5H9.781Z"/>
        </svg>
      </button>

      <button
        v-for="(page, index) in paginationRange"
        :key="index"
        @click="goToPage(page)"
        :disabled="page === '...'"
        :class="[
          'w-10 h-10 rounded-full text-clean-white font-semibold',
          page === currentPage ? 'bg-soft-shadow text-clean-white' : 'text-soft-shadow bg-transparent',
          page === '...' ? 'cursor-default text-gray-400' : ''
        ]"
      >
        {{ page }}
      </button>

      <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none">
          <path fill="#2F2F2F" d="m20.219 13.75-7-7L15 5l10 10-10 10-1.781-1.75 7-7H5v-2.5h15.219Z"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<style>
.scrollbar-hide {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
