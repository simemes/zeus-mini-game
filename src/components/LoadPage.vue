<template>
  <!-- <div class="absolute top-0 z-1 w-full h-full"> -->
    <!-- <div class="asolute translate-x-[calc(50vw-50%)] translate-y-[calc(50vh-50%)] aspect-[720/1280] max-w-[101%] max-h-[101%] z-[1] pointer-events-none overflow-hidden bg-black flex flex-col justify-center"> -->
      <img src="/images/simemes_bg.png" class="absolute top-0 left-0 w-full h-full object-cover -z-10 pointer-events-none">
      <div class="w-full h-full flex flex-col justify-center items-center">
         <img src="/images/zeus_drop_logo.png" class="flex-5 w-[60%] object-contain">
         <div class="flex-1 flex load-text font-[Inter,sans-serif] font-bold text-[20px] [text-shadow:1px_1px_0_#000,-1px_-1px_0_#000,1px_-1px_0_#000,-1px_1px_0_#000]">
          <p>Loading</p>
          <p v-if="load_point >= 1">.</p>
          <p v-if="load_point >= 2">.</p>
          <p v-if="load_point >= 3">.</p>
        </div>
      </div>
    <!-- </div> -->
  <!-- </div> -->
</template>

<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from 'vue'
import { useStore } from '../stores/store'
// import { useRouter } from 'vue-router'
// const router = useRouter()
const $store = useStore()

let sec = ref(0)
let load_point = ref(0)
let loadInterval = ref<ReturnType<typeof setInterval> | null>(null);
let interval = ref<ReturnType<typeof setInterval> | null>(null);
// ============= 切換頁面 =============
// function GoToStart() {
//   router.push('/')
// }

onMounted(() => {

  interval.value = setInterval(() => {
    sec.value++;
    
    if (sec.value === 2) {
      // GoToStart();
      $store.isLoadPage = false
    }
  }, 1000);

  loadInterval.value = setInterval(() => {
    load_point.value++;
    if (load_point.value === 4) {
      load_point.value = 0
    }
  }, 100);
  
})

onBeforeUnmount(() => {
  if (loadInterval.value) {
    clearTimeout(loadInterval.value);
    loadInterval.value = null;
  }
})
</script>

<style scoped>
</style>
