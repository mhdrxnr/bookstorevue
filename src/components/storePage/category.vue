<script setup>
import { ref } from 'vue'

// Category list (you can fetch from API later)
const categories = ref(['All', 'History', 'Philosophy', 'Literature', 'Novels'])

const selectedCategory = ref('All')
const emit = defineEmits(['select'])

const selectCategory = (category) => {
  selectedCategory.value = category
  emit('select', category)
}
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