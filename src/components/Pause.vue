<template>
  <div class="w-full h-full flex flex-col justify-center">
    <img src="/images/simemes_bg.png" class="absolute top-0 left-0 w-full h-full object-cover -z-10">
    <h1>{{ $store.pausePage.title }}</h1>
    <button @click="Continue" class="w-[100px] mx-auto">Continue</button>
  </div>
</template>

<script setup lang="ts">
// import {  } from 'vue'
import { useStore } from '../stores/store'
const $store = useStore()

const emit = defineEmits(['pauseEvent'])

// ============= 切換頁面 =============

// 暫停按鈕
function Continue() {
  emit('pauseEvent')
}
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
