
<script setup>
import { computed, ref, watch } from 'vue'
import { authStore } from '../../Stores/AuthStore'
import router from '../../router/index.js'
import Profile from '../../assets/User_lightbig.png'

defineProps({
  inStore: Boolean
})

const emit = defineEmits(['toggle-cart', 'search'])
const query = ref('')

function onSearch() {
  if (query.value.trim() !== '') {
    emit('search', query.value)
    console.log('Search emitted:', query.value)
  }
}

// 👇 NEW: Watch query and emit '' when cleared
watch(query, (newVal) => {
  if (newVal.trim() === '') {
    emit('search', '')  // Show all books when cleared
    console.log('Search cleared, showing all books')
  }
})

function onProfileClick() {
  if (authStore.isAuthenticated) {
    authStore.goToProfile()
  } else {
    authStore.toggleLogin()
  }
}

function handleCartClick() {
  emit('toggle-cart')
}

const imageUrl = computed(() => {
  return authStore.user.imageUrl
    ? authStore.user.imageUrl + '?' + Date.now()
    : Profile
})
</script>


<template>
  <nav class="w-[1300px]  h-[78px] m-[25px]">
    <ul class="flex items-center justify-between mr-[10px]">
      <li :class="inStore ?'text-soft-shadow': 'text-clean-white'" class="julius-sans-one-regular z-50 w-[199px]  ml-[0px] text-[36px]">
        <a href="#">Yasmine Elghareb</a>
      </li>
      <li :class="inStore? 'flex':'hidden'">
        <form @submit.prevent="onSearch" class="flex">
          <input type="search" placeholder="Search" name="" id="search"
          v-model="query"
          
           class="outline-none leading-[40px] w-[310px]  text-soft-shadow cairo-regular border-b-1 border-soft-shadow placeholder:text-soft-shadow placeholder:text-[20px]">
          <label for="search" class="absolute top-[8.5%] right-[32.5%]">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none"><circle cx="18.333" cy="18.333" r="10" stroke="#2F2F2F"/><path stroke="#2F2F2F" stroke-linecap="round" d="m33.333 33.333-5-5"/></svg>
          </label>
        </form>
      </li>
      <li class=" transition-all rounded-[50px] " :class="inStore?'flex':'hover:bg-forest-green'">
        <a href="#" @click.prevent="onProfileClick">
          <div v-if="authStore.isAuthenticated"
              class="w-[40px] h-[40px] rounded-full bg-cover bg-center border-2 border-soft-shadow"
              :style="{ backgroundImage: `url('${ authStore.user.imageUrl || Profile}')` }">
          </div>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none">
            <path :class="inStore?'stroke-soft-shadow' : 'stroke-clean-white'" stroke-linecap="round"
              d="M32.879 34.078c-.76-2.126-2.434-4.005-4.762-5.345-2.329-1.34-5.182-2.066-8.117-2.066-2.935 0-5.788.726-8.117 2.066-2.328 1.34-4.002 3.22-4.762 5.345" />
            <circle cx="20" cy="13.333" r="6.667" :class="inStore?'stroke-soft-shadow' : 'stroke-clean-white'" stroke-linecap="round" />
          </svg>
        </a>
      </li>
    </ul>
  </nav>
  <button @click="handleCartClick" :class="inStore?'flex':'hidden'" class="fixed bg-warm-beige/20 rounded-[50%] cursor-pointer bottom-[45px] right-[28px] z-[120]">
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none">
    <path stroke="#2F2F2F" stroke-linecap="round" 
    d="M5.833 7.5h3.559c.696 0 1.043 0 1.305.189s.372.519.592 1.179L12.5 12.5"/>
    <path stroke="#2F2F2F" stroke-linecap="round" stroke-linejoin="round" 
    d="M29.167 29.167H13.418c-1.087 0-1.63 0-1.926-.316a1 1 0 0 1-.151-.21c-.206-.38-.034-.896.31-1.926v0c.378-1.137.568-1.705.987-2.065.086-.074.179-.141.277-.2.474-.283 1.073-.283 2.27-.283h8.982"/>
    <path stroke="#2F2F2F" stroke-linecap="round" 
    d="M25.179 24.167h-8.375c-1.279 0-1.918 0-2.42-.33-.5-.331-.752-.919-1.256-2.095l-2.17-5.06c-.809-1.89-1.213-2.833-.769-3.508.445-.674 1.472-.674 3.527-.674h15.281c2.3 0 3.449 0 3.882.747.434.747-.136 1.745-1.277 3.741l-2.95 5.163c-.562.984-.843 1.475-1.309 1.745-.465.27-1.032.27-2.164.27Z"/>
    <circle cx="28.333" cy="33.333" r="1.667" fill="#2F2F2F"/>
    <circle cx="15" cy="33.333" r="1.667" fill="#2F2F2F"/>
</svg>

  </button>
</template>


<style>
input[type="search"]::-webkit-search-cancel-button {
  -webkit-appearance: none;
  appearance: none;
  display: none;
}
</style>