<script setup >
import {ref, watch} from 'vue'
import Profile from '../../assets/User_lightbig.png'
import { authStore} from '../../Stores/AuthStore';
console.log('authStore.user', authStore.user.imageUrl)
watch(() => authStore.user, (val) => {
  console.log("Updated user data in Infos.vue", val)
}, { deep: true })

</script>

<template>
    <div class="w-[738px] h-[691px] flex flex-col gap-[50px]">
        <div class=" w-[125px] mt-[5px] rounded-[100%] bg-cover bg-center h-[125px]"
        :style="{ backgroundImage: `url(${authStore.user.imageUrl || Profile})` }">

        </div>
        <div class="w-[738px] h-[406px] flex justify-between">
          <div class="cairo-regular flex flex-col gap-[50px] text-soft-shadow font-bold text-[20px]">
            <div class="w-[314px] h-[102px] flex flex-col gap-[5px]">
            <h1 class="">First Name</h1>
            <h2 class="font-normal pl-[20px] border-b-1 leading-[50px] ml-[5px] border-soft-shadow">{{authStore.user.firstName}}</h2>
            </div>
            <div class="w-[314px] h-[102px] flex flex-col gap-[5px]">
            <h1 class="">Email</h1>
            <h2 class="font-normal pl-[20px] border-b-1 leading-[50px] ml-[5px] border-soft-shadow">{{authStore.user.email}}</h2>
            </div>
            <div class="w-[314px] h-[102px] flex flex-col gap-[5px]">
            <h1 class="">Address</h1>
            <p class="font-normal pl-[20px] border-b-1 leading-[50px] ml-[5px] border-soft-shadow">{{authStore.user.address}}</p>
            </div>
          </div>
          <div class="cairo-regular flex flex-col gap-[50px] text-soft-shadow font-bold text-[20px]">
            <div class="w-[314px] h-[102px] flex flex-col gap-[5px]">
            <h1 class="">List Name</h1>
            <h2 class="font-normal pl-[20px] border-b-1 leading-[50px] ml-[5px] border-soft-shadow">{{authStore.user.lastName}}</h2>
            </div>
            <div class="w-[314px] h-[102px] flex flex-col gap-[5px]">
            <h1 class="">Number</h1>
            <h2 class="font-normal pl-[20px] border-b-1 leading-[50px] ml-[5px] border-soft-shadow">{{authStore.user.number}}</h2>
            </div>
            <div class="w-[314px] h-[102px] flex flex-col gap-[5px]">
            <h1 class="">Wilaya</h1>
            <p class="font-normal pl-[20px] border-b-1 leading-[50px] ml-[5px] border-soft-shadow">{{authStore.user.wilaya}}</p>
            </div>
          </div>
        </div>

        <div>
            <button @click="$emit('edit')" class="w-[150px] hover:text-clean-white rounded-[4px] bg-forest-green h-[50px] cairo-regular font-bold text-warm-beige">
                Edit
            </button>
        </div>
    </div>
</template>