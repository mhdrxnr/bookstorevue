<!-- <script setup>
import {ref, reactive} from 'vue'
import Landing from './components/landing.vue';

</script>

<template >
<div>
   <Landing/>
</div>
</template> -->

<script setup>
import { computed, onMounted } from 'vue'
import Landing from './components/landing.vue'
import Store from './components/store.vue'
import Profile from './components/profile.vue'
import Admin from './components/Admin.vue'
import Loading from './components/landingPage/loading.vue'
import { authStore } from './Stores/AuthStore'
onMounted(() => {
  authStore.fetchUser()
})


const isLoggedIn = computed(() => authStore.isAuthenticated)
const currentPage = computed(() => authStore.currentPage)
const isLoading = computed(() => authStore.isLoading)

</script>

<template>
  <Loading v-if="isLoading">Loading...</Loading>
  <component
  v-else
    :is="
      !isLoggedIn
        ? Landing
        : currentPage === 'store'
        ? Store
        : currentPage === 'admin'
        ? Admin
        : Profile
    "
  />
</template>








<!-- script -->
<!-- const thing = ref('')
const count = ref([])
const updateCount = (id)=>{
    count.value.push(id)
}

const downCount =()=>{
    count.value -= 1
}
const details = ref(['thing','other',"something"]) -->

<!-- template -->
<!-- <HelloWorld  :thing="thing" @add="updateCount" @mins="downCount"/>
<p>{{ count.length }}</p>
<productDetails :details="details" ></productDetails> -->
