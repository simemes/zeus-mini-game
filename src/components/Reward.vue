<template>
  <!-- <h1>{{ $store.rewardPage.title }}</h1> -->
  <h1 @click="GoToReward">{{ $store.rewardPage.title }}</h1>
</template>

<script setup lang="ts">
// import {  } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../stores/store'
const $store = useStore()
const router = useRouter()

// ============= 切換頁面 =============
function GoToReward() {
  router.push('/')

  $store.isStart = true
  $store.isReward = false
}
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
