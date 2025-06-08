<script setup>
import {ref, computed} from 'vue';
import bookImg from '../assets/Guide Book.png';
import outfitImg from '../assets/fity fit.jpg'; 


const google = ref('https://laravel.com/docs/12.x')
const header1 = ref('just trying')
const header2 = ref('something here')
const title = computed(()=>{
   return header1.value + " " + header2.value
});

const description = ref('this book is for who love novels and fantasy');
const tips = ref(['do it','dont look back','resist'])

const products =ref([
    {id:"1",name:"green",price:"20000", pic:bookImg , quantity: 20},
    {id:"2",name:"red",price:"50000", pic:outfitImg , quantity: 0}
])
const selected = ref(0)
const updateVar = (index)=>{
selected.value = index;
}

const pic = computed(()=>{
    return products.value[selected.value].pic
})
const onSale = computed(()=>{
    return products.value[selected.value].quantity > 0
})

const sizes= ref(['s','m','l','xs','xm','xl'])
const count =ref(0)

const emit = defineEmits(['add','mins'])
const method = ()=>{
    emit('add', products.value[selected.value].id);
}

const decrement = ()=> {emit('mins')}

const onTop = ref(true)

const item = ref('thing')
const brand = ref('mhd')

const both = computed(()=>{
    return item.value +" "+ brand.value 
})

const props = defineProps({
   thing: {
    type: String,

    }
})

const test = computed(()=>{
    if(props.thing ==="mhd"){
        return 'yes'
    }else{
        return 'no'
    }
})
</script>

<template>
 <h1 class="text-blue-400 text-[2rem] font-bold">{{ title }}</h1>
 <h1 class="text-[2rem] font-bold text-orange-600 bg-gray-600">sss</h1>
 <p>{{ description }}</p>
 <a class="text-purple-700" v-bind:href="google" target="_blank">click me</a>
 <p v-if="onSale === true" class="bg-green-400">there is</p>
 <p v-else="onSale" class="bg-red-400">not found</p>
<ul>
    <li class="bg-blue-400" v-for="tip in tips">{{ tip }}</li>
</ul>
<ul class="">
    <li class="bg-red-400" v-for="product in products":key="product.id">{{ product.name +" "+ product.price  }}</li>
</ul>
<ul>
    <li v-for="size in sizes">size of: {{ size }}</li>
</ul>

<p>{{ count }}</p>
<p v-if="onTop">{{ both }}</p>
<p>{{ test }}</p>
<div class=" flex flex-col-reverse justify-center p-0 m-0 bg-purple-400 h-[80px]">
    <button class="button":class="{notDisable: !onSale }" v-on:click="method":disabled="!onSale">incerment count</button>
    <button class="button":class="{notDisable: !onSale }" @click="decrement":disabled="!onSale">decrement count</button>
</div>
 <div class="border-1 rounded-[50%] w-[50px] h-[50px]" 
 v-for="(product, index) in products"
 :key="product.id"
 @mouseover="updateVar(index)":style="{backgroundColor:product.name}">
 </div>

 <img class="" :class="{outImageStock: !onSale}"  :src="pic" alt="">


</template>

<style>
.button{
    background-color: gray;
}

.notDisable{
cursor: not-allowed;
background-color: rgb(255, 86, 86);
}

.outImageStock{
width: 50px;
}

</style>
