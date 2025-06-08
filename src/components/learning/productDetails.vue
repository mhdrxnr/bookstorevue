<script setup>
import { computed, ref } from 'vue';
import Forming from './Forming.vue';
import ListForm from './ListForm.vue';

const comments = ref([])

const addComment = (comment)=>{
    comments.value.push(comment)
}
const props = defineProps({
    details:{
        type:Array,
        required:true
    }
})

const show = computed(()=>{
    return props.details
})
</script>

<template>

<ul>
     <li v-for="(item, index) in details" :key="index">{{ item }}</li>
</ul>

<Forming @submitted="addComment"/>
<ListForm :comments="comments"/>
</template>