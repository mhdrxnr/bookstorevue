<script setup>
import Book from '../../assets/Book Apps 3D Icon Model For Ui.png'
import OpenBook from '../../assets/Spell Book.png'

</script>

<template>
    <div class="h-[650px] bg-forest-green">
        <img class="absolute left-[12%] top-[108%] bounce-custom rotate-345 w-[223px]" :src="Book" alt="">
       <div class="flex gap-[25px] flex-col-reverse items-center justify-center h-screen">
            <p class="cairo-regular z-50 text-center text-clean-white text-[22px] font-normal w-[646px] h-[328px]" >At Yasmine Leghareb, we believe that every book holds the power to
                inspire, transform, and connect. Since opening our doors in 2018 in
                the heart of Mostaganem, our bookstore has been a haven for 
                readers seeking depth, meaning, and beauty in literature. We
                specialize in high-quality, handpicked titles in philosophy, history, and
                Arabic literature — many of which are carefully imported from across 
                the Arab world. Our mission is simple: to preserve the culture of 
                reading and share the timeless joy of books with generations to come.
            </p>
            <h1 class="cairo-regular text-warm-beige font-bold text-[48px]">About Us</h1>

       </div>
       <img class=" relative left-[71%] bottom-[39%] w-[310px] bounce-custom2 " :src="OpenBook" alt="">
    </div>
</template>

<style>
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
  animation: customBounce 2.2s infinite;
}
</style>