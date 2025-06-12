<script setup>
import Loading from './components/landingPage/loading.vue'
import { authStore } from './Stores/AuthStore'
import { computed } from 'vue'

const isLoading = computed(() => authStore.isLoading)
</script>

<template>
  <Loading v-if="isLoading" />
  <router-view v-else />
</template>
