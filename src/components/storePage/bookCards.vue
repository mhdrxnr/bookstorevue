<script setup>
import { ref, computed , defineProps} from 'vue'
import book from '../../assets/book1.png'
import book2 from '../../assets/book2.png'
import { useCartStore } from '../../Stores/CartStore.js'
import { useFavoriteStore } from '../../Stores/FavoritesStore.js'
import BookPopUp from './BookPopUp.vue'
// import CategorySelector from './category.vue'
const props = defineProps({
  selectedCategory: {
    type: String,
    default: 'All'
  }
})

const filteredBooks = computed(() => {
  return props.selectedCategory === 'All'
    ? allBooks.value
    : allBooks.value.filter(book => book.category === props.selectedCategory)
})

const selectedBook = ref(null)
const showPopup = ref(false)
const cart = useCartStore()
const favoriteStore = useFavoriteStore()



const allBooks = ref([
  {
    id: 1,
    title: 'Vue Basics',
    author: 'Evan You',
    price: 1500,
    image: book,
    realise: 2016,
    descp: `Line 1\nLine 2\nLine 3`,
    liked: false
  },
  {
    id: 2,
    title: 'Advanced Vue',
    author: 'Sarah Drasner',
    price: 1800,
    image: book2,
    realise: 2013,
    descp: `Another book desc line 1\nLine 2\nLine 3`,
    liked: false,
    category: 'History'
  },
  {
    id: 3,
    title: 'Vue Basics',
    author: 'Evan You',
    price: 1500,
    image: book,
    realise: 2016,
    descp: `Line 1\nLine 2\nLine 3`,
    liked: false,
    category: 'Philosophy'
  },
  {
    id: 4,
    title: 'Advanced Vue',
    author: 'Sarah Drasner',
    price: 1800,
    image: book2,
    realise: 2013,
    descp: `Another book desc line 1\nLine 2\nLine 3`,
    liked: false,
    category:'Literature'
  },
  {
    id: 5,
    title: 'Vue Basics',
    author: 'Evan You',
    price: 1500,
    image: book,
    realise: 2016,
    descp: `Line 1\nLine 2\nLine 3`,
    liked: false,
    category: 'Novels'
  },
  {
    id: 6,
    title: 'Advanced Vue',
    author: 'Sarah Drasner',
    price: 1800,
    image: book2,
    realise: 2013,
    descp: `Another book desc line 1\nLine 2\nLine 3`,
    liked: false
  },
  {
    id: 7,
    title: 'Vue Basics',
    author: 'Evan You',
    price: 1500,
    image: book,
    realise: 2016,
    descp: `Line 1\nLine 2\nLine 3`,
    liked: false
  },
  {
    id: 8,
    title: 'Advanced Vue',
    author: 'Sarah Drasner',
    price: 1800,
    image: book2,
    realise: 2013,
    descp: `Another book desc line 1\nLine 2\nLine 3`,
    liked: false
  },
  {
    id: 1,
    title: 'Vue Basics',
    author: 'Evan You',
    price: 1500,
    image: book,
    realise: 2016,
    descp: `Line 1\nLine 2\nLine 3`,
    liked: false
  },
  {
    id: 2,
    title: 'Advanced Vue',
    author: 'Sarah Drasner',
    price: 1800,
    image: book2,
    realise: 2013,
    descp: `Another book desc line 1\nLine 2\nLine 3`,
    liked: false
  },
  {
    id: 1,
    title: 'Vue Basics',
    author: 'Evan You',
    price: 1500,
    image: book,
    realise: 2016,
    descp: `Line 1\nLine 2\nLine 3`,
    liked: false
  },
  {
    id: 2,
    title: 'Advanced Vue',
    author: 'Sarah Drasner',
    price: 1800,
    image: book2,
    realise: 2013,
    descp: `Another book desc line 1\nLine 2\nLine 3`,
    liked: false
  },
  {
    id: 1,
    title: 'Vue Basics',
    author: 'Evan You',
    price: 1500,
    image: book,
    realise: 2016,
    descp: `Line 1\nLine 2\nLine 3`,
    liked: false
  },
  {
    id: 2,
    title: 'Advanced Vue',
    author: 'Sarah Drasner',
    price: 1800,
    image: book2,
    realise: 2013,
    descp: `Another book desc line 1\nLine 2\nLine 3`,
    liked: false
  },
  {
    id: 1,
    title: 'Vue Basics',
    author: 'Evan You',
    price: 1500,
    image: book,
    realise: 2016,
    descp: `Line 1\nLine 2\nLine 3`,
    liked: false
  },
  {
    id: 2,
    title: 'Advanced Vue',
    author: 'Sarah Drasner',
    price: 1800,
    image: book2,
    realise: 2013,
    descp: `Another book desc line 1\nLine 2\nLine 3`,
    liked: false
  },
  {
    id: 1,
    title: 'Vue Basics',
    author: 'Evan You',
    price: 1500,
    image: book,
    realise: 2016,
    descp: `Line 1\nLine 2\nLine 3`,
    liked: false
  },
  {
    id: 2,
    title: 'Advanced Vue',
    author: 'Sarah Drasner',
    price: 1800,
    image: book2,
    realise: 2013,
    descp: `Another book desc line 1\nLine 2\nLine 3`,
    liked: false
  },
  {
    id: 1,
    title: 'Vue Basics',
    author: 'Evan You',
    price: 1500,
    image: book,
    realise: 2016,
    descp: `Line 1\nLine 2\nLine 3`,
    liked: false
  },
  {
    id: 2,
    title: 'Advanced Vue',
    author: 'Sarah Drasner',
    price: 1800,
    image: book2,
    realise: 2013,
    descp: `Another book desc line 1\nLine 2\nLine 3`,
    liked: false
  },
  {
    id: 1,
    title: 'Vue Basics',
    author: 'Evan You',
    price: 1500,
    image: book,
    realise: 2016,
    descp: `Line 1\nLine 2\nLine 3`,
    liked: false
  },
  {
    id: 2,
    title: 'Advanced Vue',
    author: 'Sarah Drasner',
    price: 1800,
    image: book2,
    realise: 2013,
    descp: `Another book desc line 1\nLine 2\nLine 3`,
    liked: false
  },
  {
    id: 1,
    title: 'Vue Basics',
    author: 'Evan You',
    price: 1500,
    image: book,
    realise: 2016,
    descp: `Line 1\nLine 2\nLine 3`,
    liked: false
  },
  {
    id: 2,
    title: 'Advanced Vue',
    author: 'Sarah Drasner',
    price: 1800,
    image: book2,
    realise: 2013,
    descp: `Another book desc line 1\nLine 2\nLine 3`,
    liked: false
  },
  {
    id: 1,
    title: 'Vue Basics',
    author: 'Evan You',
    price: 1500,
    image: book,
    realise: 2016,
    descp: `Line 1\nLine 2\nLine 3`,
    liked: false
  },
  {
    id: 2,
    title: 'Advanced Vue',
    author: 'Sarah Drasner',
    price: 1800,
    image: book2,
    realise: 2013,
    descp: `Another book desc line 1\nLine 2\nLine 3`,
    liked: false
  },
  {
    id: 1,
    title: 'Vue Basics',
    author: 'Evan You',
    price: 1500,
    image: book,
    realise: 2016,
    descp: `Line 1\nLine 2\nLine 3`,
    liked: false
  },
  {
    id: 2,
    title: 'Advanced Vue',
    author: 'Sarah Drasner',
    price: 1800,
    image: book2,
    realise: 2013,
    descp: `Another book desc line 1\nLine 2\nLine 3`,
    liked: false
  },
  {
    id: 1,
    title: 'Vue Basics',
    author: 'Evan You',
    price: 1500,
    image: book,
    realise: 2016,
    descp: `Line 1\nLine 2\nLine 3`,
    liked: false
  },
  {
    id: 2,
    title: 'Advanced Vue',
    author: 'Sarah Drasner',
    price: 1800,
    image: book2,
    realise: 2013,
    descp: `Another book desc line 1\nLine 2\nLine 3`,
    liked: false
  },
  {
    id: 1,
    title: 'Vue Basics',
    author: 'Evan You',
    price: 1500,
    image: book,
    realise: 2016,
    descp: `Line 1\nLine 2\nLine 3`,
    liked: false
  },
  {
    id: 2,
    title: 'Advanced Vue',
    author: 'Sarah Drasner',
    price: 1800,
    image: book2,
    realise: 2013,
    descp: `Another book desc line 1\nLine 2\nLine 3`,
    liked: false
  },
  {
    id: 1,
    title: 'Vue Basics',
    author: 'Evan You',
    price: 1500,
    image: book,
    realise: 2016,
    descp: `Line 1\nLine 2\nLine 3`,
    liked: false
  },
  {
    id: 2,
    title: 'Advanced Vue',
    author: 'Sarah Drasner',
    price: 1800,
    image: book2,
    realise: 2013,
    descp: `Another book desc line 1\nLine 2\nLine 3`,
    liked: false
  },
  {
    id: 1,
    title: 'Vue Basics',
    author: 'Evan You',
    price: 1500,
    image: book,
    realise: 2016,
    descp: `Line 1\nLine 2\nLine 3`,
    liked: false
  },
  {
    id: 2,
    title: 'Advanced Vue',
    author: 'Sarah Drasner',
    price: 1800,
    image: book2,
    realise: 2013,
    descp: `Another book desc line 1\nLine 2\nLine 3`,
    liked: false
  },
  {
    id: 1,
    title: 'Vue Basics',
    author: 'Evan You',
    price: 1500,
    image: book,
    realise: 2016,
    descp: `Line 1\nLine 2\nLine 3`,
    liked: false
  },
  {
    id: 2,
    title: 'Advanced Vue',
    author: 'Sarah Drasner',
    price: 1800,
    image: book2,
    realise: 2013,
    descp: `Another book desc line 1\nLine 2\nLine 3`,
    liked: false
  },
  {
    id: 1,
    title: 'Vue Basics',
    author: 'Evan You',
    price: 1500,
    image: book,
    realise: 2016,
    descp: `Line 1\nLine 2\nLine 3`,
    liked: false
  },
  {
    id: 2,
    title: 'Advanced Vue',
    author: 'Sarah Drasner',
    price: 1800,
    image: book2,
    realise: 2013,
    descp: `Another book desc line 1\nLine 2\nLine 3`,
    liked: false
  },
  {
    id: 1,
    title: 'Vue Basics',
    author: 'Evan You',
    price: 1500,
    image: book,
    realise: 2016,
    descp: `Line 1\nLine 2\nLine 3`,
    liked: false
  },
  {
    id: 2,
    title: 'Advanced Vue',
    author: 'Sarah Drasner',
    price: 1800,
    image: book2,
    realise: 2013,
    descp: `Another book desc line 1\nLine 2\nLine 3`,
    liked: false
  },
  // ADD more books here to test pagination
])

const currentPage = ref(1)
const booksPerPage = 40

const totalPages = computed(() => Math.ceil(filteredBooks.value.length / booksPerPage))

const displayedBooks = computed(() => {
  const start = (currentPage.value - 1) * booksPerPage
  return filteredBooks.value.slice(start, start + booksPerPage)
})
//__________________________________
function openBookPopup(book) {
  selectedBook.value = book
  showPopup.value = true
}

function closePopup() {
  showPopup.value = false
}

function toggleLike(book) {
  book.liked = !book.liked
  favoriteStore.toggleFavorite(book)
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

  if (current - delta > 2) {
    rangeWithDots.push('...')
  }

  rangeWithDots.unshift(1)
  rangeWithDots.push(...range)

  if (current + delta < total - 1) {
    rangeWithDots.push('...')
  }

  if (total > 1) {
    rangeWithDots.push(total)
  }

  return rangeWithDots
})


//_______________________
function handleAddToCart() {
  if (!selectedBook.value || !selectedBook.value.id) {
    alert("Invalid book.")
    return
  }

  const existing = cart.items.find(item => item.id === selectedBook.value.id)

  cart.addToCart(selectedBook.value)

  if (existing) {
    alert("📦 Book quantity increased in the cart.")
  } else {
    alert("✅ Book added to cart!")
  }
}
</script>


<template>
  <div class="container flex flex-col items-center mx-auto">
    
    <!-- Popup -->
    <BookPopUp
    :show="showPopup"
    :book="selectedBook"
    @close="closePopup"
    @add-to-cart="handleAddToCart"
  />

    <!-- Book Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[25px]">
      <div
        v-for="book in displayedBooks"
        :key="book.id"
        class="p-[5px] relative bg-warm-beige w-[274px] h-[380px] rounded-[4px] cursor-pointer"
        @click="openBookPopup(book)"
      >
        <div
          :style="{ backgroundImage: `url(${book.image})` }"
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
                :stroke="favoriteStore.isFavorite(book.id) ? '#FF3535' : '#3D4A42'"
                :fill="favoriteStore.isFavorite(book.id) ? '#FF3535' : 'none'"
                stroke-width="2"
                d="M22.75 1c-3.69 0-6.371 2.6-7.25 3.9C14.621 3.6 11.81 1 7.59 1 2.319 1 1 4.9 1 9.45 1 14 10.667 22.883 15.5 27 20.114 23.1 30 14 30 9.45 30 4.21 27.364 1 22.75 1Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

<div class="flex justify-center items-center mt-8 gap-2">
   <button
    @click="goToPage(currentPage - 1)"
    :disabled="currentPage === 1"
    class=""
  >
   <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none"><path fill="#2F2F2F" d="m9.781 16.25 7 7L15 25 5 15 15 5l1.781 1.75-7 7H25v2.5H9.781Z"/></svg>
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
   <button
    @click="goToPage(currentPage + 1)"
    :disabled="currentPage === totalPages"
    class=""
  >
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none"><path fill="#2F2F2F" d="m20.219 13.75-7-7L15 5l10 10-10 10-1.781-1.75 7-7H5v-2.5h15.219Z"/></svg>
  </button>
</div>
  </div>
</template>



<style>
.scrollbar-hide {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
}
.scrollbar-hide::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
</style>

<!-- 
<div class="flex justify-center items-center gap-4 mt-6">
  <button
    @click="prevPage"
    :disabled="currentPage === 1"
    class="cursor-pointer px-4 py-2 rounded cairo-regular text-soft-shadow "
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none"><path fill="#2F2F2F" d="m9.781 16.25 7 7L15 25 5 15 15 5l1.781 1.75-7 7H25v2.5H9.781Z"/></svg>
  </button>

  <span class="text-lg font-semibold cairo-regular text-soft-shadow ">
    Page {{ currentPage }} of {{ totalPages }}
  </span>

  <button
    @click="nextPage"
    :disabled="currentPage === totalPages"
    class="cursor-pointer px-4 cairo-regular text-soft-shadow  py-2 rounded  "
  >
<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none"><path fill="#2F2F2F" d="m20.219 13.75-7-7L15 5l10 10-10 10-1.781-1.75 7-7H5v-2.5h15.219Z"/></svg>  </button>
</div>

const currentPage = ref(1)
const itemsPerPage = 24 // 6 rows × 4 cards per row

const totalPages = computed(() =>
  Math.ceil(books.value.length / itemsPerPage)
)

const paginatedBooks = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return books.value.slice(start, end)
})

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  } -->