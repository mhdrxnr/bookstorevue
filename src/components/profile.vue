<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../Stores/AuthStore'

import list from './profilePage/list.vue'
import NavBar from './landingPage/navBar.vue'
import Cart from './storePage/cart.vue'
import Footerr from './landingPage/footer.vue'
import Infos from './profilePage/Infos.vue'
import Favorite from './profilePage/favorite.vue'
import UpdateInfos from './profilePage/UpdateInfos.vue'

// ✅ Correctly use Pinia store
const authStore = useAuthStore()

const showCart = ref(false)
const isEditing = ref(false)
const currentSection = ref('infos') // 'infos' | 'favorites'

function toggleEdit() {
  isEditing.value = !isEditing.value
}

function toggleCart() {
  showCart.value = !showCart.value
}

function switchSection(section) {
  currentSection.value = section
  isEditing.value = false // reset editing when switching
}
</script>


<template>
  <div  class="bg-clean-white h-screen flex flex-col gap-[100px]">
    <Cart v-if="showCart" @close="toggleCart"/>
    <NavBar @toggle-cart="toggleCart" :inStore="true" />
   <div class="flex items-start gap-[62px]">
     <list @switch-section="switchSection" :activeSection="currentSection"/>
     <template v-if="currentSection === 'infos'">
        <Infos
          v-if="!isEditing && authStore.user"
          @edit="toggleEdit"
          :key="authStore.user.imageUrl || 'default'"
        />
        <UpdateInfos v-else @save="toggleEdit" />
     </template>
     <Favorite v-else-if="currentSection === 'favorites'" />
   </div>
    <Footerr class="mt-[250px]"/>

  </div>
</template>
