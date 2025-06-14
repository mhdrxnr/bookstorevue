
<script setup>
import HeroSection from './landingPage/heroSection.vue'
import AboutUs from './landingPage/aboutUs.vue'
import Service from './landingPage/service.vue'
import Footerr from './landingPage/footer.vue'
import BasePop from './landingPage/basePop.vue'
import Registration from './landingPage/registration.vue'
import { useAuthStore } from '../Stores/AuthStore'

const authStore = useAuthStore()
</script>

<template>
  <HeroSection id="HeroSection" />
  <AboutUs id="AboutUs" />
  <Service id="Service" />
  <Footerr id="Footer" />

  <!-- Conditional rendering -->
  <BasePop v-if="authStore.showLogin" class="fixed z-[99] top-0 left-0 w-full h-full" />
  <Registration v-if="authStore.showRegister" class="fixed z-[99] top-0 left-0 w-full h-full" />
</template>
