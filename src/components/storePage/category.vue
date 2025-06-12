<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const categories = ref(['All']) // Always include "All"
const selectedCategory = ref('All')
const emit = defineEmits(['select'])

const selectCategory = (category) => {
  selectedCategory.value = category
  emit('select', category)
}

// Fetch categories from API
const fetchCategories = async () => {
  try {
    const res = await axios.get('http://localhost:8000/api/categories', { withCredentials: true })
    // Extract names only and append to the default "All"
    categories.value = ['All', ...res.data.map(cat => cat.name)]
  } catch (err) {
    console.error('Error fetching categories:', err)
  }
}

onMounted(fetchCategories)
</script>


<template>
    <div class="">
       <ul class="flex justify-center gap-[25px]">
          <li v-for="category in categories" :key="category">
      <button
        @click="selectCategory(category)"
        :class="[
          'w-[184px] h-[50px] rounded-[4px] border-[1px] text-[24px] font-bold transition-all',
          selectedCategory === category
            ? 'bg-forest-green text-warm-beige border-0'
            : 'border-soft-shadow text-soft-shadow hover:text-warm-beige hover:bg-forest-green hover:border-0'
        ]"
      >
        {{ category }}
      </button>
    </li>
       </ul>
    </div>
</template>