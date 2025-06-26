<template>
  <h1>{{ $store.resultPage.title }}</h1>
  <img src="/images/pepe_in_chest.png"/>
</template>

<script setup lang="ts">
import { useStore } from '../stores/store'
const $store = useStore()
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
