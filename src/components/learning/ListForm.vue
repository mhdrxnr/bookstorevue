<script setup>
defineProps({
    comments: {
        type: Array,
        required: true
    }
})
</script>

<template>
    <ul>
        <li v-for="(comment,index) in comments":key="index">{{ comment.name + " " + comment.openion + " " + comment.rate }}</li>
    </ul>
</template>