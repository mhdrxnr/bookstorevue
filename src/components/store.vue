<script setup>
import NavBar from './landingPage/navBar.vue'
import Footerr from './landingPage/footer.vue'
import Category from './storePage/category.vue'
import BookCards from './storePage/bookCards.vue'
import Cart from './storePage/cart.vue'
import Loading from './landingPage/loading.vue'

import { useBookStore } from '../Stores/BookStore'
import { ref, computed, onMounted } from 'vue'

const bookStore = useBookStore()

onMounted(() => {
  bookStore.fetchBooks()
})

const showCart = ref(false)
const selectedCategory = ref('All')

function toggleCart() {
  showCart.value = !showCart.value
}

function handleCategorySelect(category) {
  selectedCategory.value = category
}

const isLoading = computed(() => bookStore.isLoading)

const searchTerm = ref('')

</script>


<template>
    <div class="flex flex-col gap-[25px] bg-clean-white ">
        <div class="flex flex-col gap-[77px]">
            <NavBar @toggle-cart="toggleCart" :inStore="true" @search="searchTerm = $event"/>
            <Category @select="handleCategorySelect"/>
        </div>
        <Loading v-if="isLoading">Loading...</Loading>
        <div v-else class="">
           <BookCards :selected-category="selectedCategory" :search="searchTerm"/>
            <Cart v-if="showCart" @close="toggleCart" />
        </div>
        <Footerr/>
    </div>
    
    
    
</template>