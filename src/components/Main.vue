<template>
  <h1 @click="GoToStart">{{ $store.MainPage.title }}</h1>
  <!-- <img src="/images/zeus.png"/> -->

</template>

<script setup lang="ts">
// import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../stores/store'
const $store = useStore()
const router = useRouter()

// ============= 切換頁面 =============
function GoToStart() {
  router.push('/home')
}

</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
