<template>
  <h1>{{ $store.msg }}</h1>
</template>

<script setup lang="ts">
// import {  } from 'vue'
import { useStore } from '../stores/store'
const $store = useStore()

</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
