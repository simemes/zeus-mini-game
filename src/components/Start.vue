<template>
  <!-- box -->
  <div class="relative w-[90%] flex flex-col justify-center items-center bg-[#C87637] rounded-[20px] p-1 border-[2px] border-[#3A1D07]">
    <!-- close -->
    <div @click="Close" class="absolute -top-2 -right-2 w-[10%] z-1 pointer-events-auto">
      <img :src="close" class="">
    </div>
    <!-- items -->
    <div class="relative w-[100%] flex flex justify-around bg-[#45250C] rounded-[20px] p-5 border-[#3A1D07] border-[2px]">
      <ItemPanel></ItemPanel>
    </div>
    <!-- btn -->
    <!-- <div @click="GameStart" class="btn-box btn-click" :class="{ disabled: $store.games_data.todayPlayCount >= $store.games_data.maxPlayCount}" :disabled="$store.games_data.todayPlayCount >= $store.games_data.maxPlayCount"> -->
    <div @click="GameStart" class="btn-box btn-click">
      <div class="strokeText " data-stroke="Start">Start</div>
      <div class="flex justify-center my-1">
        <div class="w-[10%] relative flex items-center justify-center">
          <img :src="zChance" class="rotate-[-15deg]">
        </div>
        <div class="w-[20%] relative tracking-widest">
          <div class="play-count" data-stroke="x 1">x 1</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import ItemPanel from '../components/ItemPanel.vue'
import { useStore } from '../stores/store'

import close from '@/assets/images/close.png'
import zChance from '@/assets/images/zeus_3chance.png'

const $store = useStore()
const emit = defineEmits(['startEvent'])

// ================================== function ==================================

// 開始按鈕
function GameStart() {
  emit('startEvent')
}
// 關閉 start
function Close() {
  $store.isReady = false
}

// ================================== onMounted ==================================

onMounted(() => {
  // $store.games_data.todayPlayCount = 1
  // $store.games_data.maxPlayCount = 2
})

</script>

<style scoped>
.btn-box {
  @apply text-center my-[15px] font-[800];
  @apply shadow-[inset_0px_-4px_0px_0px_#00000040] bg-[linear-gradient(to_bottom,_#FFDC30_50%,_#F8C022_50%,_#F8C022_90%,_#FFDC30_100%)];
  @apply h-[60px] rounded-[8px] relative pointer-events-auto;
  border: 1px solid black !important;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  touch-action: manipulation;
  @apply max-w-[400px] w-[65%] h-[72px];
}
.disabled {
  @apply bg-[linear-gradient(to_bottom,_#6D638A_50%,_#5D537A_50%,_#6D638A_100%)] pointer-events-none;
}
.btn-click {
  @apply transition-transform duration-100 active:scale-90 select-none outline-none ring-0;
}
.strokeText {
  @apply relative top-[5px] w-full text-[24px] text-[#FFFFFF] z-0;
}
.strokeText::before {
  content: attr(data-stroke);
  -webkit-text-stroke: 5px black;
  text-stroke: 5px black;
  @apply absolute top-[0px] left-[0px] w-full -z-1;
}

.play-count {
  @apply relative w-full text-[14px] text-[#FFFFFF] z-1;
}
.play-count::before {
  content: attr(data-stroke);
  -webkit-text-stroke: 2.5px black;
  text-stroke: 2.5px black;
  @apply absolute top-[0px] left-[0px] w-full -z-1;
}
</style>
