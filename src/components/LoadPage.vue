<template>
  <img src="/images/simemes_bg.png" class="absolute top-0 left-0 w-full h-full object-cover -z-10 pointer-events-none">
  <div class="w-full h-full flex flex-col justify-center items-center">

    <!-- pass & chance -->
    <div v-if="$store.isPreloaded" class="w-full flex flex-1 justify-between mt-6">
      <!-- pass -->
      <div class="w-[12%] relative m-5">
        <div @click="getPass" class="bg-[#00000050] rounded-full p-1 aspect-square flex justify-center items-center pointer-events-auto">
          <img src="/images/zeus_pass.png" class="rotate-[-15deg] w-[80%]">
        </div>
      </div>
      <!-- chance -->
      <div @click="get3Chance" class="relative w-[18%] h-[31%] m-5 bg-[#00000050] rounded-full p-3 flex justify-center items-center pointer-events-auto">
        <div class="flex-1">
          <img src="/images/zeus_3chance.png" class="rotate-[-15deg]">
        </div>
        <div class="absolute w-[20%] bottom-[5%] left-[30%]">
          <img src="/images/plus_icon.png">
        </div>
        <div class="flex-2 text-[14px] font-[700]">{{ $store.users_profile.maxPlayCount - $store.users_profile.todayPlayCount }}</div>
      </div>
    </div>
    <!-- zeus_drop_logo -->
    <img src="/images/zeus_drop_logo.png" class="flex-4 w-[60%] object-contain">
    
    <!-- Ready Zone -->
    <div v-if="$store.isPreloaded" class="flex flex-col justify-start flex-4 mx-[15%] load-text font-bold text-[12px]">
      <div>
        <div class="my-5">Collect items, avoid bombs, score big, and climb the leaderboard!</div>
        <div class="my-5">But beware, as time ticks on, the challenge accelerates.</div>
        <div class="my-5">Top 30% on the leaderboard will qualify for rewards after the event ends.</div>
      </div>
      <div @click="Ready" class="btn-box btn-click">
        <div class="strokeText" data-stroke="Ready">Ready</div>
      </div>
    </div>

    <!-- loadingProgress -->
    <div v-if="!$store.isPreloaded" class="flex-1 font-[700] text-[14px]">
      <p>Loading ... {{ $store.loadingProgress }}%</p>
    </div>

  </div>
</template>

<script setup lang="ts">
import { useStore } from '../stores/store'
const $store = useStore()
const emit = defineEmits(['readyEvent'])

function Ready() {
  emit('readyEvent')
}

function getPass() {
  $store.isBuyPass = true
}

function get3Chance() {
  $store.isBuyChance = true
}

</script>

<style scoped>
.btn-box {
  @apply text-center my-[2px] font-[800];
  @apply shadow-[inset_0px_-4px_0px_0px_#00000040] bg-[linear-gradient(to_bottom,_#FFDC30_50%,_#F8C022_50%,_#F8C022_90%,_#FFDC30_100%)];
  @apply h-[60px] rounded-[8px] -z-1 relative pointer-events-auto;
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
.strokeText {
  @apply relative top-[10px] w-full text-[24px] text-[#FFFFFF];
}
.strokeText::before {
  content: attr(data-stroke);
  -webkit-text-stroke: 5px black;
  text-stroke: 5px black;
  @apply absolute top-[0px] left-[0px] w-full -z-1;
}
</style>
