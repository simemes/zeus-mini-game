<template>
  <PhaserGame />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../stores/store'
import PhaserGame from '../components/PhaserGame.vue'
const $store = useStore()
const router = useRouter()

// ============================ onMounted ============================

onMounted(() => {
})

</script>

<style scoped>
</style>
