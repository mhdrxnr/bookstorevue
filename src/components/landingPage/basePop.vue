

<script setup>
import { useAuthStore } from '../../Stores/AuthStore'
import { ref } from 'vue'

// Initialize Pinia store
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const error = ref('')

async function login() {
  if (password.value.length < 8) {
    error.value = 'Password must be at least 8 characters.'
    return
  }

  try {
    await authStore.loginWithApi(email.value, password.value)
    if (!authStore.user.client_id) {
      error.value = 'No client profile found for this user.'
    }
  } catch (e) {
    error.value = 'Login failed. Please check your credentials.'
  }
}

function close() {
  authStore.closePopup()
}

function goToRegister() {
  authStore.openRegister()
}
</script>


<template>
  <div class="bg-soft-shadow/40 h-full flex justify-center items-center w-full" @click.self="close">
    <div class="relative flex flex-col gap-[25px] items-center justify-center p-[25px] bg-warm-beige rounded-[4px] w-[550px] h-[550px]">
      <svg @click="close" xmlns="http://www.w3.org/2000/svg" class="absolute top-[12px] right-[12px] cursor-pointer" width="40" height="40" fill="none">
        <path stroke="#2F2F2F" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"
          d="M25 15 15 25m0-10 10 10m11.667-5c0 9.205-7.462 16.667-16.667 16.667-9.205 0-16.667-7.462-16.667-16.667 0-9.205 7.462-16.667 16.667-16.667 9.205 0 16.667 7.462 16.667 16.667Z" />
      </svg>
      <h1 class="cairo-regular text-center text-forest-green text-[36px] font-bold">Hi,<br>Login to Your Account</h1>
      <form @submit.prevent="login" class="flex-col gap-[25px] flex">
        <!-- Inputs same as before -->
        <!-- ... -->
         <div class="flex flex-col gap-[10px]">
                <label for="email" class="cairo-regular font-bold text-[20px] text-forest-green">Email</label>
                <input v-model="email" type="email" required placeholder="enter your Email" class="inputL outline-none h-[40px] w-[314px] rounded-[12px] pl-[20px] py-[5px] text-forest-green cairo-regular border-1 border-forest-green placeholder:text-forest-green placeholder:text-[20px]" id="email">
              </div>
              <div class="flex-col flex gap-[10px]">
                <label for="" class=" cairo-regular font-bold text-[20px] text-forest-green">Password</label>
                <input v-model="password"  minlength="8" type="password" required placeholder="enter your password " class="inputL outline-none text-forest-green rounded-[12px] w-[314px] p-[20px] h-[40px] cairo-regular border-1 border-forest-green placeholder:text-forest-green placeholder:text-[20px]" id="password">
              </div>
        <div class="flex gap-[20px] justify-center w-[314px]">
          <button type="button" @click="goToRegister" class="cairo-regular cursor-pointer font-bold text-warm-beige text-[20px] rounded-[6px] bg-forest-green h-[35px] w-[125px]">
            Create One
          </button>
          <button type="submit" class="cairo-regular cursor-pointer font-bold text-forest-green text-[20px] rounded-[6px] border-2 border-forest-green h-[35px] w-[125px]">
            Log In
          </button>
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