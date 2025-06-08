<script setup>
import NavBar from './landingPage/navBar.vue';
import Footerr from './landingPage/footer.vue';
import Category from './storePage/category.vue';
import BookCards from './storePage/bookCards.vue';
import Cart from './storePage/cart.vue';
import { authStore } from '../Stores/AuthStore';
import { ref } from 'vue';
const showCart = ref(false)
const selectedCategory = ref('All')

function toggleCart() {
  showCart.value = !showCart.value
}

function handleCategorySelect(category) {
  selectedCategory.value = category
}
</script>

<template>
    <div class="flex flex-col gap-[25px] bg-clean-white ">
        <div class="flex flex-col gap-[77px]">
            <NavBar @toggle-cart="toggleCart" :inStore="true" />
            <Category @select="handleCategorySelect"/>
        </div>
        <div class="">
           <BookCards :selected-category="selectedCategory"/>
            <Cart v-if="showCart" @close="toggleCart" />
        </div>
        <Footerr/>
    </div>
    
    
    
</template>