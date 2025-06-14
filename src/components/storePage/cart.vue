<script setup>
import { useCartStore } from '../../Stores/CartStore'
import { useAuthStore } from '../../Stores/AuthStore' // If you're using Pinia (optional)
import { web,api } from '../../axios'
import { computed, ref } from 'vue'

const cart = useCartStore()
const authStore = useAuthStore ? useAuthStore() : null
const userId = computed(() => authStore?.user?.user_id || null) // fallback if not using Pinia

const emit = defineEmits(['close'])
function handleCartClose() {
  emit('close')
}

const isPlacingOrder = ref(false)

async function placeOrder() {
  if (!userId.value) {
    alert('You must be logged in to place an order.')
    return
  }

  if (cart.items.length === 0) {
    alert('Your cart is empty.')
    return
  }

  isPlacingOrder.value = true

  const orderPayload = {
    user_id: userId.value, // ✅ Include user_id explicitly
    totalPrice: cart.totalPrice + 250,
    status: 'pending',
    books: cart.items.map(book => ({
      bookID: book.book_id,
      quantity: book.quantity,
      unitPrice: book.price
    }))
  }

  try {
    await web.get('/sanctum/csrf-cookie')
    const response = await api.post('/orders', orderPayload)
    console.log('✅ Order placed:', response.data)

    alert('✅ Order placed successfully!')
    cart.items = []
    handleCartClose()
  } catch (err) {
    console.error('❌ Failed to place order:', err)
    alert('❌ Failed to place order. Please try again.')
  } finally {
    isPlacingOrder.value = false
  }
}

function formatImage(image) {
  if (!image) return 'https://via.placeholder.com/101x128?text=No+Image'
  if (image.startsWith('http')) return image
  return `http://localhost:8000/storage/${image}`
}



</script>

<template>
  <div
    class="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-[999]"
  >
    <div class="bg-clean-white h-[620px] w-[1316px] p-6 rounded-lg shadow-lg relative flex justify-between items-center">
      <!-- Close Button -->
      <svg @click="handleCartClose" xmlns="http://www.w3.org/2000/svg" class="absolute top-[12px] right-[12px] cursor-pointer" width="40" height="40" fill="none">
        <path stroke="#2F2F2F" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"
          d="M25 15 15 25m0-10 10 10m11.667-5c0 9.205-7.462 16.667-16.667 16.667-9.205 0-16.667-7.462-16.667-16.667 0-9.205 7.462-16.667 16.667-16.667 9.205 0 16.667 7.462 16.667 16.667Z" />
      </svg>

      <div class="w-[894px] rounded-[4px]  overflow-y-auto scrollbar-hide h-[551px] ">
        <table class="w-[894px]   ">
            <thead class="cairo-regular font-bold text-[20px]  text-soft-shadow">
                <tr class=" text-center leading-[42px] border-b-2">
                    <td class="w-[426px] text-start">Book</td>
                    <td class="w-[150px]">Price</td>
                    <td class="w-[150px] ">Quantity</td>
                    <td class="w-[150px]">Total</td>
                    <td class="w-[60px]"></td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in cart.items"
                    :key="item.id"
                 class="h-[128px] text-center border-b-2 text-soft-shadow">
                    <td class="cairo-regular  text-soft-shadow  py-[25px] flex gap-[25px]">
                        <div :style="{backgroundImage:`url('${formatImage(item.image)}')`}" class="bg-center bg-cover w-[101px] h-[128px]">       
                        </div>
                        <div class="flex flex-col gap-[25px] items-start justify-center ">
                            <h1 class="font-bold ">{{item.title}}</h1>
                            <h2 class="font-medium text-[14px]">{{item.author}}</h2>
                        </div>
                    </td>
                    <td class=" font-semibold ">
                       {{ item.price}}da
                    </td>
                    <td class="  pl-[22px]">
                        <div class="flex gap-[20px] justify-center items-center w-[104px] rounded-[50px] bg-[#d9d9d9] h-[29px]">
                         <svg @click="cart.updateQuantity(item.id, item.quantity - 1)" xmlns="http://www.w3.org/2000/svg" width="15" height="4" fill="none"><path stroke="#2F2F2F" stroke-width="4" d="M0 2h15"/></svg>
                         <h1 class="cairo-regular font-bold text-soft-shadow text-[20px]">{{ item.quantity }}</h1>
                         <svg @click="cart.updateQuantity(item.id, item.quantity + 1)" xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none"><path stroke="#2F2F2F" stroke-width="3" d="M0 7.5h15M7.5 0v15"/></svg>                        </div>
                    </td>
                    <td class=" font-semibold  ">
                        {{ item.price * item.quantity }}.00da
                    </td>
                    <td class="pl-[18px]">
                          <svg @click="cart.removeFromCart(item.id)" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none"><path stroke="#1E1E1E" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15.625 9.375-6.25 6.25m0-6.25 6.25 6.25m7.292-3.125c0 5.753-4.664 10.417-10.417 10.417S2.083 18.253 2.083 12.5 6.747 2.083 12.5 2.083 22.917 6.747 22.917 12.5Z"/></svg>
                    </td>
                </tr>
            </tbody>
        </table>
      </div>
      <!-- Cart Items - for now, static -->
      <div class="w-[322px] h-[356px] flex flex-col  ">
        <div class="bg-warm-beige rounded-[4px]">
            <h2 class="cairo-regular border-b-1 p-[20px] text-[24px] font-semibold text-soft-shadow ">ORDER SUMMARY</h2>
           <div class="flex flex-col items-center border-b-1 text-soft-shadow">
              <ul class=" flex flex-col gap-[20px] w-[272px] p-[20px]">
              <li class="flex justify-between">
                <span>subtotal</span>
                <span>{{ cart.totalPrice }}.00da</span>
              </li>
              <li class="flex justify-between">
                <span>shipping</span>
                <span>250.00da</span>
              </li>
            </ul>
           </div>
           <div class="p-[25px]  ">
            <ul class="w-[272px] cairo-regular px-[20px] text-soft-shadow" >
              <li class="flex items-center justify-between">
                <span class="font-bold text-[20px]">TOTAL</span>
                <span>{{ cart.totalPrice + 250 }}.00da</span>
              </li>
            </ul>

           </div>
        </div>
    
      <div>
        <button
          @click="placeOrder"
          :disabled="isPlacingOrder"
          class="mt-4 w-full cairo-regular font-semibold text-[24px] bg-forest-green text-warm-beige  py-2 h-[60px] rounded hover:bg-clean-white hover:text-forest-green hover:border hover:border-forest-green transition-all disabled:opacity-50 disabled:cursor-not-allowed">
          {{ isPlacingOrder ? 'Placing Order...' : 'CHECKOUT' }}
        </button>

      </div>
      </div>
     
    </div>
  </div>
</template>
