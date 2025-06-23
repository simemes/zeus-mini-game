<template>
  <!-- <h1 @click="GoToReward">{{ $store.startPage.title }}</h1> -->
  <img src="/images/bg-blue-sky.jpg"/>
</template>

<script setup lang="ts">
// import {  } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../stores/store'
const $store = useStore()
const router = useRouter()

// ============= 切換頁面 =============
function GoToReward() {
  router.push('/reward')

  $store.isStart = false
  $store.isReward = true
}
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
