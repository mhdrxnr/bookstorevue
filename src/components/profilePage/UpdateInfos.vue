<script setup>
import { ref, watch } from 'vue'
import { useAuthStore } from '../../Stores/AuthStore' // ✅ Use Pinia convention
import Profile from '../../assets/User_lightbig.png'

const authStore = useAuthStore() // ✅ Access the store correctly
const wilayas = [
  "Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Batna", "Béjaïa", "Biskra", "Béchar", "Blida", "Bouira",
  "Tamanrasset", "Tébessa", "Tlemcen", "Tiaret", "Tizi Ouzou", "Alger", "Djelfa", "Jijel", "Sétif", "Saïda",
  "Skikda", "Sidi Bel Abbès", "Annaba", "Guelma", "Constantine", "Médéa", "Mostaganem", "M'Sila", "Mascara",
  "Ouargla", "Oran", "El Bayadh", "Illizi", "Bordj Bou Arréridj", "Boumerdès", "El Tarf", "Tindouf", "Tissemsilt",
  "El Oued", "Khenchela", "Souk Ahras", "Tipaza", "Mila", "Aïn Defla", "Naâma", "Aïn Témouchent", "Ghardaïa",
  "Relizane", "Timimoun", "Bordj Badji Mokhtar", "Ouled Djellal", "Beni Abbes", "In Salah", "In Guezzam",
  "Touggourt", "Djanet", "El M'Ghair", "El Menia"
]

const imageUrl = ref(authStore.user?.imageUrl || '')
const fileInput = ref(null)
const selectedImage = ref(null)

function triggerUpload() {
  fileInput.value?.click()
}

function deleteImage() {
  authStore.user.imageUrl = ''
  selectedImage.value = null
  imageUrl.value = ''
}

function onFileChange(event) {
  const file = event.target.files[0]
  if (!file) return

  selectedImage.value = file // Real file to send to backend

  const reader = new FileReader()
  reader.onload = () => {
    imageUrl.value = reader.result // Preview only
  }
  reader.readAsDataURL(file)
}

watch(() => authStore.user?.imageUrl, (newVal) => {
  if (!selectedImage.value) imageUrl.value = newVal || ''
})

const emit = defineEmits(['save'])

async function handleSave() {
  try {
    // Update user
    await authStore.updateUser({
      email: authStore.user.email
    })

    // Prepare form data for client update
    const formData = new FormData()
    formData.append('firstName', authStore.user.firstName)
    formData.append('lastName', authStore.user.lastName)
    formData.append('number', authStore.user.number)
    formData.append('address', authStore.user.address)
    formData.append('wilaya', authStore.user.wilaya)

    if (selectedImage.value) {
      formData.append('image', selectedImage.value)
    }

    await authStore.updateClient(formData)

    authStore.user.imageUrl = imageUrl.value

    emit('save')
  } catch (error) {
    console.error('Update failed', error.response || error)
    alert('Failed to save changes. Please try again.')
  }
}
</script>



<template>
    <form @submit.prevent="handleSave" class="w-[738px] h-[691px] flex flex-col gap-[50px]">
        <div  class="flex items-center gap-[39px]">
            <div :style="{backgroundImage: `url(${imageUrl || Profile})`}" class="bg-center bg-cover  w-[125px] mt-[5px] rounded-[100%] bg-gray-400 h-[125px]">
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
            <select v-if="authStore.user" v-model="authStore.user.wilaya"
              class="font-normal pl-[20px] border-1 rounded-[4px] leading-[60px] ml-[5px] border-soft-shadow">
              <option disabled value="">-- Select Wilaya --</option>
              <option v-for="w in wilayas" :key="w" :value="w">{{ w }}</option>
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