<script setup>
import { reactive } from 'vue';

const emit = defineEmits(['submitted'])

const comments = reactive({
    name:'',
    openion:'',
    rate: null
})

const onSubmit = ()=>{
    const fresh = {
        name: comments.name,
        openion: comments.openion,
        rate: comments.rate
    }

    emit('submitted',fresh)

    comments.name ='',
    comments.openion='',
    comments.rate=''
}
</script>

<template>
    <form @submit.prevent="onSubmit">
        <label for="name" >your Name:</label>
        <input type="text" id="name" v-model="comments.name">

        <label for="openion">your openion</label>
        <textarea  id="openion" v-model="comments.openion"></textarea>

        <label for="rate">rate from: </label>
        <select id="rate" v-model="comments.rate">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        </select>

        <input type="submit" value="submit">
    </form>
</template>