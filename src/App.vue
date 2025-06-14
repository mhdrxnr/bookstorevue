<script setup>
import { computed } from 'vue'
import { useAuthStore } from './Stores/AuthStore' // ✅ Correct Pinia usage
import Loading from './components/landingPage/loading.vue'

// ✅ Call the store function
const authStore = useAuthStore()

const isLoading = computed(() => authStore.isLoading)
</script>


<template>
  <Loading v-if="isLoading" />
  <router-view v-else />
</template>
