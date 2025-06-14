<script setup>
import { useAuthStore } from '../../Stores/AuthStore' // ✅ Correct import (case-sensitive and consistent)

const authStore = useAuthStore() // ✅ Initialize the Pinia store

function goBack() {
  authStore.goToStore()
}

const emit = defineEmits(['switch-section'])
const props = defineProps({
  activeSection: String 
})

function showInfos() {
  emit('switch-section', 'infos')
}

function showFavorites() {
  emit('switch-section', 'favorites')
}

function logout() {
  authStore.logout()
}
</script>




<template>
    <div class=" p-[25px] flex flex-col gap-[90px] h-[58vh] justify-center ">
       <div class="flex  items-center gap-[10px] cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none"><path fill="#2F2F2F" d="M10.433 17.333 17.9 24.8 16 26.667 5.333 16 16 5.333 17.9 7.2l-7.467 7.467h16.234v2.666H10.433Z"/></svg>        
            <button class="cairo-regular cursor-pointer text-[32px] font-bold text-soft-shadow" @click="goBack">    
            Go Back to Store
        </button> 
       </div>
       <ul class="cairo-regular cursor-pointer text-soft-shadow font-bold text-[24px]">
        <li @click="showInfos" class="w-[272px] rounded-[4px] h-[49px] flex items-center p-[5px]" :class="props.activeSection === 'infos' ? 'bg-warm-beige' : ''">Personnel Informations</li>
        <li @click="showFavorites" class="w-[272px] rounded-[4px] h-[49px] flex items-center p-[5px] " :class="props.activeSection === 'favorites' ? 'bg-warm-beige' : ''">Favorite Books</li>
        <li @click="logout" class="w-[272px] rounded-[4px] h-[49px] flex items-center p-[5px]">Log Out</li>
       </ul>
    </div>
</template>