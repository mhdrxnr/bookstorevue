<script setup>
import img from '../../assets/heroImg.jpg'
import SideBar from './sideBar.vue';
import navBar from './navBar.vue';
</script>

<template>
    <div  class=" hero flex flex-col h-[650px]">
           <navBar/>
           <SideBar class="fixed top-[20%] z-40 right-[0px] w-full"/>

            <div class="content absolute top-[7%] flex gap-[25px] justify-center flex-col-reverse ml-[25px] h-screen">
                <button class="slide-in-left2 w-[200px] rounded-[2px] border-[1px] border-clean-white h-[50px] cursor-pointer text-clean-white font-semibold hover:font-[800] hover:bg-warm-beige  hover:text-soft-shadow delay-[.1s] hover:border-0 transition-all z-50">
                    <a href="" class=" cairo-regular text-[20px] ">EXPLORE NOW</a>
                    </button>
                <div class="w-[534px] h-[120px]">
                    <p class="slide-in-left cairo-regular text-clean-white">At Yasmine elghareb, we bring you a handpicked selection of timeless books in
                        philosophy, literature, and history — thoughtfully sourced from across the Arab
                        world. Rooted in tradition, driven by passion, we invite you to rediscover the
                        beauty of reading and the quiet power of a good book.</p>
                </div>
                <div class="">
                    <h1 class="slide-in-Top cairo-regular w-[534px] h-[80px] font-bold text-clean-white text-[30px]">
                        Step into a world <br>
                        where stories breathe and ideas live on</h1>
                    </div>
                
            </div>
    </div>
    
</template>






<style>
.hero{
    background-image: url('../../assets/heroImg.jpg');
    background-position: center;
    background-position-y: -4px;
    background-size: cover;
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-300px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.slide-in-left {
  animation: slideInLeft 1.4s ease-out forwards;
}
.slide-in-left2 {
  animation: slideInLeft 1.8s ease-out forwards;
}

@keyframes slideInTop {
  from {
    opacity: 0;
    transform: translateY(-100px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-in-Top {
  animation: slideInTop 1.2s ease-out forwards;
}
</style>
