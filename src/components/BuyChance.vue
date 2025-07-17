<template>
  <!-- box -->
  <div class="relative w-[90%] flex flex-col justify-center items-center bg-[#C87637] rounded-[20px] p-1 border-[2px] border-[#3A1D07]">
    <!-- close -->
    <div @click="Close" class="absolute -top-2 -right-2 w-[10%] z-1 pointer-events-auto">
      <img :src="close" class="">
    </div>
    <!-- items -->
    <div class="relative w-[100%] flex flex justify-around bg-[#45250C] rounded-[20px] p-5 border-[#3A1D07] border-[2px]">
      <div class="w-[100%] relative mx-1 flex flex-col justify-center items-center my-2">
        <img :src="zChance" class="flex-1 rotate-[-15deg] w-[30%] my-3">
        <div class="strokeText-2 flex-1" data-stroke="x 3">x 3</div>
      </div>
    </div>
    <!-- btn -->
    <div @click="Purchase" class="btn-box btn-click">
      <div class="strokeText " :data-stroke="purchaseForChance">{{ purchaseForChance }}</div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useStore } from '../stores/store'

import close from '@/assets/images/close.png'
import zChance from '@/assets/images/zeus_3chance.png'

const $store = useStore()
const emit = defineEmits(['startEvent'])

// ============= 切換頁面 =============

// 開始按鈕
function Purchase() {
  console.log('Purchase!')
  $store.games_data.maxPlayCount += 3
  $store.isBuyChance = false
}
// 關閉 BuyChance
function Close() {
  $store.isBuyChance = false
}

// ================================== computed ==================================

const purchaseForChance = computed(() => {
  let result;
  result = `Purchase for ★ ${$store.purchaseNum}`
  return result
})

// ================================== onMounted ==================================

onMounted(() => {
  
})

</script>

<style scoped>
.btn-box {
  @apply text-center my-[15px] font-[800];
  @apply shadow-[inset_0px_-4px_0px_0px_#00000040] bg-[linear-gradient(to_bottom,_#50D500_50%,_#42C115_50%,_#42C115_90%,_#50D500_100%)];
  @apply h-[60px] rounded-[8px] relative pointer-events-auto;
  border: 1px solid black !important;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  touch-action: manipulation;
  @apply max-w-[400px] w-[65%] h-[48px];
}
.disabled {
  @apply bg-[linear-gradient(to_bottom,_#6D638A_50%,_#5D537A_50%,_#6D638A_100%)] pointer-events-none;
}
.btn-click {
  @apply transition-transform duration-100 active:scale-90 select-none outline-none ring-0;
}
.strokeText {
  @apply relative top-[12px] w-full text-[14px] text-[#FFFFFF] z-0;
}
.strokeText::before {
  content: attr(data-stroke);
  -webkit-text-stroke: 3px black;
  text-stroke: 3px black;
  @apply absolute top-[0px] left-[0px] w-full -z-1;
}

.strokeText-2 {
  @apply relative w-full text-[14px] text-[#FFFFFF] z-1 font-[800];
}
.strokeText-2::before {
  content: attr(data-stroke);
  -webkit-text-stroke: 2.5px black;
  text-stroke: 2.5px black;
  @apply absolute top-[0px] left-[0px] w-full -z-1;
}
</style>
