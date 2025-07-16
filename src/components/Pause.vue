<template>
  <img :src="bg" class="absolute top-0 left-0 w-full h-full object-cover -z-10 pointer-events-none">
  <div class="w-full flex flex-col justify-center items-center">
    <!-- items -->
    <div class="w-[67%]">
      <ItemPanel></ItemPanel>
    </div>
    <!-- btn -->
    <button @click="Continue" class="btn btn-click type1 pointer-events-auto mt-5">Continue</button>
  </div>
</template>

<script setup lang="ts">
import ItemPanel from '../components/ItemPanel.vue'

import bg from '@/assets/images/simemes_bg.png'

const emit = defineEmits(['pauseEvent'])

// ============= 切換頁面 =============

// 暫停按鈕
function Continue() {
  emit('pauseEvent')
}
</script>

<style scoped>
.btn {
  @apply font-[Inter,sans-serif] text-center [text-shadow:1px_1px_0_#000,-1px_-1px_0_#000,1px_-1px_0_#000,-1px_1px_0_#000];
  @apply shadow-[inset_0px_-4px_0px_0px_#00000040] bg-[linear-gradient(to_bottom,_#057ACB_50%,_#0460A8_50%,_#057ACB_100%)];
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
  @apply max-w-[400px] w-[65%] h-[48px] text-[14px];
}
</style>
