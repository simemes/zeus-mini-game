<template>
  <h1 @click="GoToMain">{{ $store.resultPage.title }}</h1>
  <img src="/images/pepe_in_chest.png"/>
</template>

<script setup lang="ts">
// import {  } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../stores/store'
const $store = useStore()
const router = useRouter()

// ============= 切換頁面 =============
function GoToMain() {
  router.push('/')

  $store.isStart = true
  $store.isResult = false
}
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
