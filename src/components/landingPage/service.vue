<script setup>
import Feedback from '../../assets/Feedback 3D Model (HD).png'
import Book from '../../assets/Open Book And Bulb 3D Illustration.png'
import Box from '../../assets/Box Protection.png'
import AboutImg from "../../assets/aboutImg.jpg"
</script>

<template>
    <div class=" flex items-center gap-[137px] h-[650px] bg-warm-beige">
       
       <div class="flex gap-[25px]  justify-center flex-col-reverse pl-[25px]">
         <div class="flex  h-[120px] items-center justify-start gap-[50px]">
            <img class="w-[136px] bounce-custom relative top-[-25px]" :src="Book" alt="">
            <img class="w-[136px] bounce-custom2 " :src="Box" alt="">
            <img class="w-[136px] bounce-custom3 " :src="Feedback" alt="">
        </div>
        <div >
            <h1 class="text-forest-green  font-bold text-[48px]">Store</h1>
            <p class="cairo-regular text-[22px]  text-soft-shadow w-[645px] h-[123px]">
                More than a bookstore — we’re a movement. We aim to spread the 
                love of reading through events, book recommendations, and 
                community engagement.
            </p>
            <p class="cairo-regular text-[22px]  text-soft-shadow w-[645px] h-[123px]">
                Browse a rich collection of carefully selected books in philosophy, 
                history, and literature. At Yasmine Leghareb, we offer high-quality 
                titles that spark thought and inspire lifelong learning.
            </p>
        </div>
       </div>
        <div class="w-[420px] h-[515px] rounded-[4px] flex flex-col-reverse items-center pt-[25px] justify-end bg-forest-green">
            <div class="w-[372px] flex justify-between items-center">
                <p class="cairo-regular text-clean-white text-[15px]">Shop Thoughtfully Selected Books</p>
                <button class="bg-warm-beige  text-forest-green flex items-center justify-evenly pl-[10px] gap-0 rounded-[2px] cairo-regular font-semibold w-[138px] h-[47px] text-[18px] hover:text-warm-beige hover:bg-forest-green hover:border-[1px] transition-all z-50">SHOP NOW
                    <svg class="fill-forest-green transition-all hover:fill-warm-beige" xmlns="http://www.w3.org/2000/svg" width="37" height="37" fill="none">
                        <path  
                        d="M27.447 10.324v-.5h.5v.5h-.5ZM11.449 27.03a.5.5 0 0 1-.708-.707l.707.707Zm2.916-17.205h13.082v1H14.365v-1Zm13.582.5v13.082h-1V10.323h1Zm-.147.354L11.448 27.03l-.707-.708L27.093 9.971l.707.707Z"/>
                    </svg>
                </button>
            </div>
            <h1 class=" cairo-regular font-bold text-[25.8px] text-warm-beige">Where Stories Find Their Readers</h1>
            <div class=" image w-[372px] h-[363px] rounded-[2px] ">
            </div>
            
        </div>
    </div>
</template>

<style>
.image{
    background-image: url('../../assets/aboutImg.jpg');
    background-position: center;
    background-size: cover;
}

@keyframes customBounce {
  0%, 100% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(-25px);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

.bounce-custom {
  animation: customBounce 1.5s infinite;
}
.bounce-custom2 {
  animation: customBounce 2.5s infinite;
}
.bounce-custom3 {
  animation: customBounce 3s infinite;
}
</style>