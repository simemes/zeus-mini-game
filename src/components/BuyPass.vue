<template>
  <!-- box -->
  <div class="relative w-[90%] flex flex-col justify-center items-center bg-[linear-gradient(to_bottom,_#BC621B_0%,_#823900_100%)] rounded-[20px] p-5 border-[2px] border-[#3A1D07]">
    <!-- close -->
    <div @click="Close" class="absolute -top-2 -right-2 w-[10%] z-1 pointer-events-auto">
      <img src="/images/close.png" class="">
    </div>
    <!-- pic -->
    <div @click="Close" class="absolute -top-11 left-4 w-[30%] z-1 pointer-events-auto">
      <img src="/images/zeus_pass.png" class="rotate-[-15deg]">
    </div>
    <div class="strokeText-3 flex-1 mb-5 sm:text-[20px] md:text-[30px] lg:text-[40px] xl:text-[50px]" data-stroke="Zeus’s Blessing Pass">Zeus’s Blessing Pass</div>
    <!-- items -->
    <div class="relative w-[100%] flex flex justify-around bg-[#6C2F00] rounded-[8px] p-3 mx-10 mb-5">
      <div class="w-[100%] relative flex flex-col justify-center items-center my-2">
        <div class="strokeText-2 flex justify-start items-center px-3 sm:text-[14px] md:text-[24px] lg:text-[34px] xl:text-[44px]">
          <img src="/images/x_star.png" class="w-[5%] mx-1">
          <div>Get one extra play per day</div>
        </div>
      </div>
    </div>
    <!-- btn -->
    <div v-if="!$store.isPassTime" @click="Purchase" class="btn-box btn-click" :class="{ disabled: $store.users_profile.todayPlayCount >= $store.users_profile.maxPlayCount}" :disabled="$store.users_profile.todayPlayCount >= $store.users_profile.maxPlayCount">
      <div class="strokeText" data-stroke="$ 1">$ 1</div>
    </div>
    <!-- text -->
    <div v-if="!$store.isPassTime" class="strokeText-2 mt-2 mb-2">30-day Privileges</div>
    <div v-if="$store.isPassTime" class="strokeText-2 mt-2 mb-2">Days Left: {{ $store.passLeft }}</div>

  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useStore } from '../stores/store'
const $store = useStore()
const emit = defineEmits(['startEvent'])

// ============= 切換頁面 =============

// 開始按鈕
function Purchase() {
  console.log('Purchase!')
  $store.isPassTime = true
}
// 關閉 BuyChance
function Close() {
  $store.isBuyPass = false
}

// ================================== onMounted ==================================

onMounted(() => {
  
})

</script>

<style scoped>
.btn-box {
  @apply text-center mt-[0px] font-[800];
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
  -webkit-text-stroke: 4px black;
  text-stroke: 4px black;
  @apply absolute top-[0px] left-[0px] w-full -z-1;
}

.strokeText-2 {
  @apply relative w-full text-[#FFFFFF] z-1 font-[800];
}
.strokeText-2::before {
  content: attr(data-stroke);
  -webkit-text-stroke: 2.5px black;
  text-stroke: 2.5px black;
  @apply absolute top-[0px] left-[0px] w-full -z-1;
}
.strokeText-3 {
  @apply relative w-full text-[#FFDC30] z-1 font-[800];
}
.strokeText-3::before {
  content: attr(data-stroke);
  -webkit-text-stroke: 5px #371800;
  text-stroke: 5px #371800;
  @apply absolute top-[0px] left-[0px] w-full -z-1;
}
</style>
