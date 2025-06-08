<script setup>
defineProps({
  show: Boolean,
  book: Object,
})
defineEmits(['close', 'add-to-cart'])
</script>

<template>
    <div
    v-if="show"
    class="fixed top-0 left-0 w-full h-full bg-soft-shadow/45 flex items-center justify-center z-[99]"
  >
    <div class="bg-clean-white p-[20px] rounded-lg h-[620px] w-[1316px] scrollbar-hide overflow-y-auto relative">
      <svg @click="$emit('close')" xmlns="http://www.w3.org/2000/svg" class="absolute top-[12px] right-[12px] cursor-pointer" width="40" height="40" fill="none">
        <path stroke="#2F2F2F" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"
          d="M25 15 15 25m0-10 10 10m11.667-5c0 9.205-7.462 16.667-16.667 16.667-9.205 0-16.667-7.462-16.667-16.667 0-9.205 7.462-16.667 16.667-16.667 9.205 0 16.667 7.462 16.667 16.667Z" />
      </svg>

      <div v-if="book" class="flex gap-[25px]">
        <div :style="{ backgroundImage: `url(${book.image})` }"
             class="h-[743px] rounded-[4px] w-[587px] bg-center bg-cover">
        </div>

        <div class="flex flex-col justify-center">
          <div class="flex flex-col gap-[25px]">
            <h1 class="cairo-regular text-soft-shadow font-bold text-[34px]">{{ book.title }}</h1>
            <h3 class="cairo-regular text-soft-shadow font-medium text-[20px]">{{ book.author }}</h3>
            <h3 class="cairo-regular text-soft-shadow font-medium text-[20px]">Realise Date: {{ book.realise }}</h3>
            <p class="cairo-regular text-soft-shadow font-medium text-[16px] w-[578px] h-[300px]">
              {{ book.descp }}
            </p>
          </div>

          <div class="flex items-center gap-[50px] mt-6">
            <h1 class="cairo-regular text-soft-shadow font-bold text-[34px]">{{ book.price }}.00DA</h1>
            <button
              @click="$emit('add-to-cart', book)"
              class="cairo-regular text-[28px] rounded-[4px] bg-forest-green text-warm-beige font-bold w-[209px] h-[67px] cursor-pointer hover:text-forest-green hover:border-forest-green hover:bg-clean-white hover:border-2 transition-all"
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>