

<script setup>
import { useAuthStore } from '../../Stores/AuthStore' // ✅ useAuthStore for Pinia
import { ref } from 'vue'
import {api} from '../../axios'

const email = ref('')
const password = ref('')
const password_confirmation = ref('')
const number = ref('')

// ✅ Use Pinia store instance
const authStore = useAuthStore()

function close() {
  authStore.closePopup()
}

function goToLogin() {
  authStore.openLogin()
}

async function register() {
  try {
    // Register the user
    const response = await api.post('/users', {
      email: email.value,
      password: password.value,
      password_confirmation: password_confirmation.value,
      number: number.value,
    })

    alert(response.data.message || 'Registration successful')

    // Auto-login with the registered credentials
    await authStore.loginWithApi(email.value, password.value)
  } catch (error) {
    if (error.response?.data?.errors) {
      const errors = Object.values(error.response.data.errors).flat().join(', ')
      alert('Registration failed: ' + errors)
    } else {
      alert('Unexpected error occurred during registration.')
    }
  }
}
</script>


<template>
  <div class="bg-soft-shadow/40 h-full flex justify-center items-center w-full" @click.self="close">
    <div class="relative flex flex-col gap-[25px] items-center justify-center p-[25px] bg-warm-beige rounded-[4px] w-[550px] h-[620px]">
      <svg @click="close" xmlns="http://www.w3.org/2000/svg" class="absolute top-[12px] right-[12px] cursor-pointer" width="40" height="40" fill="none">
        <path stroke="#2F2F2F" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"
          d="M25 15 15 25m0-10 10 10m11.667-5c0 9.205-7.462 16.667-16.667 16.667-9.205 0-16.667-7.462-16.667-16.667 0-9.205 7.462-16.667 16.667-16.667 9.205 0 16.667 7.462 16.667 16.667Z" />
      </svg>
      <h1 class="cairo-regular text-center text-forest-green text-[36px] font-bold">Join Us Now</h1>
      <form @submit.prevent="register" class="flex-col gap-[25px] flex">
        <!-- Inputs same as before -->
        <!-- ... -->
         <div class="flex flex-col gap-[10px]">
                <label for="" class="cairo-regular font-bold text-[20px] text-forest-green">Email</label>
                <input v-model="email" type="email" required placeholder="enter your Email" class="inputL outline-none h-[40px] w-[314px] rounded-[12px] pl-[20px] py-[5px] text-forest-green cairo-regular border-1 border-forest-green placeholder:text-forest-green placeholder:text-[20px]">
              </div>
              <div class="flex-col flex gap-[10px]">
                <label for="" class=" cairo-regular font-bold text-[20px] text-forest-green">Phone Number</label>
                <input v-model="number" type="text" required placeholder="enter your number " class="inputL outline-none text-forest-green rounded-[12px] w-[314px] p-[20px] h-[40px] cairo-regular border-1 border-forest-green placeholder:text-forest-green placeholder:text-[20px]">
              </div>
              <div class="flex-col flex gap-[10px]">
                <label for="" class=" cairo-regular font-bold text-[20px] text-forest-green"> Create a Password</label>
                <input v-model="password" type="password" required placeholder="enter your password " class="inputL outline-none text-forest-green rounded-[12px] w-[314px] p-[20px] h-[40px] cairo-regular border-1 border-forest-green placeholder:text-forest-green placeholder:text-[20px]">
              </div>
              <div class="flex-col flex gap-[10px]">
                <label for="" class=" cairo-regular font-bold text-[20px] text-forest-green">Confirm Password</label>
                <input v-model="password_confirmation" type="password" required placeholder=" password confirmation " class="inputL outline-none text-forest-green rounded-[12px] w-[314px] p-[20px] h-[40px] cairo-regular border-1 border-forest-green placeholder:text-forest-green placeholder:text-[20px]">
              </div>
        <div class="flex gap-[20px] justify-center w-[314px]">
          <button type="submit" class="cairo-regular font-bold text-warm-beige text-[20px] rounded-[6px] bg-forest-green h-[35px] w-[125px] cursor-pointer">Create</button>
          <button type="button" @click="goToLogin" class="cairo-regular font-bold text-forest-green text-[20px] rounded-[6px] border-2 border-forest-green h-[35px] w-[125px] cursor-pointer">Have One!</button>
        </div>
      </form>
    </div>
  </div>
</template>
<style>
.inputL::selection{
    color: var(--color-warm-beige);
    background: var(--color-forest-green);
}
</style>