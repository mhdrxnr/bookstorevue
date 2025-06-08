<script setup >
import { ref, watch } from 'vue'
import { authStore} from '../../Stores/AuthStore'
import api from '../../axios'
// Suppose you get the updated client from the backend
// const updatedClient = response.data.client;

// Then update the Pinia store directly
// authStore.isClient = updatedClient;

// Initialize imageUrl safely with fallback
const imageUrl = ref(authStore.user?.imageUrl || '')

const fileInput = ref(null)

function triggerUpload() {
  fileInput.value?.click()
}

function deleteImage() {
  if(authStore.user) {
    authStore.user.imageUrl = ''
  }
}

function onFileChange(event) {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = () => {
    if(authStore.user) {
      authStore.user.imageUrl = reader.result // assign base64 string
    }
  }
  reader.readAsDataURL(file)
}

// Optional: watch authStore.user and update imageUrl reactive ref if needed
watch(() => authStore.user?.imageUrl, (newVal) => {
  imageUrl.value = newVal || ''
})
const emit = defineEmits(['save']);

async function handleSave() {
  try {
    await api.put('/api/clients', authStore.user) // Adjust endpoint to match your backend
    emit('save') // Close form
  } catch (error) {
    console.error('Update failed', error)
    alert('Failed to save changes. Please try again.')
  }
}

</script>

<template>
    <form @submit.prevent="handleSave" class="w-[738px] h-[691px] flex flex-col gap-[50px]">
        <div  class="flex items-center gap-[39px]">
            <div :style="{backgroundImage: authStore.user?.imageUrl? `url(${authStore.user.imageUrl})`:`url(${Profile})`}" class="bg-center bg-cover  w-[125px] mt-[5px] rounded-[100%] bg-gray-400 h-[125px]">
                <button @click="triggerUpload" type="button"  class=" h-[125px] w-[125px] flex items-end justify-end">
                    <svg  xmlns="http://www.w3.org/2000/svg" width="41" height="41" fill="none"><rect width="39" height="39" x="1" y="1" fill="#3D4A42" rx="19.5"/><rect width="39" height="39" x="1" y="1" stroke="#fff" stroke-width="2" rx="19.5"/><path stroke="#FAFAF8" stroke-linecap="round" class="z-[120] cursor-pointer" stroke-linejoin="round" stroke-width="2" d="M31.958 27.792a2.083 2.083 0 0 1-2.083 2.083h-18.75a2.083 2.083 0 0 1-2.083-2.083V16.333a2.083 2.083 0 0 1 2.083-2.083h4.167l2.083-3.125h6.25l2.083 3.125h4.167a2.083 2.083 0 0 1 2.083 2.083v11.459Z"/><path stroke="#FAFAF8" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.5 25.708a4.167 4.167 0 1 0 0-8.333 4.167 4.167 0 0 0 0 8.333Z"/></svg>
                </button>
            </div>
            <div class="flex gap-[27px]">
                  <input  type="file"  ref="fileInput" @change="onFileChange" accept="image/*" class="hidden"/>
                <button type="button" @click="triggerUpload" class="w-[150px] cursor-pointer hover:text-clean-white rounded-[4px] bg-forest-green h-[50px] cairo-regular font-bold text-clean-white">
                Update pic
            </button>
                <button type="button" @click="deleteImage" class="w-[150px] cursor-pointer  rounded-[4px] border-2 border-forest-green h-[50px] cairo-regular font-bold text-forest-green">
                Delete
            </button>
            </div>
        </div>
        <div class="w-[738px] h-[406px] flex justify-between">
          <div class="cairo-regular flex flex-col gap-[50px] text-soft-shadow font-bold text-[20px]">
            <div class="w-[314px] h-[102px] flex flex-col gap-[5px]">
            <label class="">First Name</label>
            <input v-if="authStore.user" v-model="authStore.user.firstName" class="font-normal pl-[20px] border-1 rounded-[4px] leading-[50px] ml-[5px] border-soft-shadow">
            </div>
            <div class="w-[314px] h-[102px] flex flex-col gap-[5px]">
            <label class="">Email</label>
            <input v-if="authStore.user" v-model="authStore.user.email" class="font-normal pl-[20px] border-1 rounded-[4px] leading-[50px] ml-[5px] border-soft-shadow">
            </div>
            <div class="w-[314px] h-[102px] flex flex-col gap-[5px]">
            <label class="">Address</label>
            <input v-if="authStore.user" v-model="authStore.user.address" class="font-normal pl-[20px] border-1 rounded-[4px] leading-[50px] ml-[5px] border-soft-shadow">
            </div>
          </div>
          <div class="cairo-regular flex flex-col gap-[50px] text-soft-shadow font-bold text-[20px]">
            <div class="w-[314px] h-[102px] flex flex-col gap-[5px]">
            <label class="">Last Name</label>
            <input v-if="authStore.user" v-model="authStore.user.lastName" class="font-normal pl-[20px] border-1 rounded-[4px] leading-[50px] ml-[5px] border-soft-shadow">
            </div>
            <div class="w-[314px] h-[102px] flex flex-col gap-[5px]">
            <label class="">Number</label>
            <input v-if="authStore.user" v-model="authStore.user.number" class="font-normal pl-[20px] border-1 rounded-[4px] leading-[50px] ml-[5px] border-soft-shadow">
            </div>
            <div class="w-[314px] h-[102px] flex flex-col gap-[5px]">
            <label class="">Wilaya</label>
            <select v-if="authStore.user" v-model="authStore.user.wilaya" class="font-normal pl-[20px] border-1 rounded-[4px] leading-[60px] ml-[5px] border-soft-shadow">
                <option value="alg">alg</option>
                <option value="oran">oran</option>
                <option value="mostaganem">mostaganem</option>
            </select>
            </div>
          </div>
        </div>

        <div>
            <button type="submit" class="w-[150px] cursor-pointer hover:text-clean-white rounded-[4px] bg-forest-green h-[50px] cairo-regular font-bold text-warm-beige">
                save
            </button>
        </div>
    </form>
</template>