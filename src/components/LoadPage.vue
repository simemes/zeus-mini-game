<template>
  <img src="/images/simemes_bg.png" class="absolute top-0 left-0 w-full h-full object-cover -z-10 pointer-events-none">
  <div class="w-full h-full flex flex-col justify-center items-center">
    <img src="/images/zeus_drop_logo.png" class="flex-5 w-[60%] object-contain">

    <div v-if="!$store.isLoaded" class="flex-1 flex load-text font-[Inter,sans-serif] font-bold text-[20px] [text-shadow:1px_1px_0_#000,-1px_-1px_0_#000,1px_-1px_0_#000,-1px_1px_0_#000]">
      <p>Loading</p>
      <p v-if="load_point >= 1">.</p>
      <p v-if="load_point >= 2">.</p>
      <p v-if="load_point >= 3">.</p>
    </div>

    <div v-if="$store.isLoaded" class="flex flex-col justify-start flex-5 mx-[15%] load-text font-[Inter,sans-serif] font-bold text-[12px]">
      <div>
        <div class="my-5">Collect items, avoid bombs, score big, and climb the leaderboard!</div>
        <div class="my-5">But beware, as time ticks on, the challenge accelerates.</div>
        <div class="my-5">Top 30% on the leaderboard will qualify for rewards after the event ends.</div>
      </div>
      <button @click="Ready" class="btn btn-click type1 pointer-events-auto">Ready</button>
    </div>

  </div>
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

function Ready() {
  $store.isReady = true
  // console.log($store.isReady)
}

onMounted(() => {

  interval.value = setInterval(() => {
    sec.value++;
    
    if (sec.value === 2) {
      // GoToStart();
      $store.isLoaded = true
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
.btn {
  @apply font-[Inter,sans-serif] text-center [text-shadow:1px_1px_0_#000,-1px_-1px_0_#000,1px_-1px_0_#000,-1px_1px_0_#000] my-[2px];
  @apply shadow-[inset_0px_-4px_0px_0px_#00000040] bg-[linear-gradient(to_bottom,_#FFDC30_50%,_#FBC222_50%,_#FFDC30_100%)];
  border: 1px solid black !important;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  touch-action: manipulation;
}
.btn-click {
  @apply transition-transform duration-100 active:scale-90 select-none outline-none ring-0;
}
.type1 {
  @apply w-[100%] h-[60px] text-[24px];
}
</style>
