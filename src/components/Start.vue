<template>
  <!-- box -->
  <div class="relative w-[90%] flex flex-col justify-center items-center bg-[#C87637] rounded-[20px] p-1 border-[2px] border-[#3A1D07]">
    <!-- close -->
    <div @click="Close" class="absolute -top-2 -right-2 w-[10%] z-1 pointer-events-auto">
      <img src="/images/close.png" class="">
    </div>
    <!-- items -->
    <div class="relative w-[100%] flex flex justify-around bg-[#45250C] rounded-[20px] p-5 border-[#3A1D07] border-[2px]">
      <ItemPanel></ItemPanel>
    </div>
    <!-- btn -->
    <button @click="GameStart" class="btn btn-click type1 pointer-events-auto" :class="{ disabled: $store.users_profile.todayPlayCount >= $store.users_profile.maxPlayCount}" :disabled="$store.users_profile.todayPlayCount >= $store.users_profile.maxPlayCount">
      <div class="">Start</div>
      <div class="text-[14px] text-black [text-shadow:none]">( {{ $store.users_profile.todayPlayCount }} / {{ $store.users_profile.maxPlayCount }} )</div>
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import ItemPanel from '../components/ItemPanel.vue'
import { useStore } from '../stores/store'
const $store = useStore()
const emit = defineEmits(['startEvent'])

// ============= 切換頁面 =============

// 開始按鈕
function GameStart() {
  if($store.users_profile.todayPlayCount >= $store.users_profile.maxPlayCount) {
    console.warn('todayPlayCount greater than maxPlayCount')
    return
  }
  emit('startEvent')
}
// 關閉 start
function Close() {
  $store.isReady = false
}

onMounted(() => {
  // $store.users_profile.todayPlayCount = 1
  // $store.users_profile.maxPlayCount = 2
})

</script>

<style scoped>
.btn {
  @apply font-[Inter,sans-serif] text-center [text-shadow:1px_1px_0_#000,-1px_-1px_0_#000,1px_-1px_0_#000,-1px_1px_0_#000] my-[10px];
  @apply shadow-[inset_0px_-4px_0px_0px_#00000040] bg-[linear-gradient(to_bottom,_#FFDC30_50%,_#F8C022_50%,_#F8C022_90%,_#FFDC30_100%)];
  border: 1px solid black !important;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  touch-action: manipulation;
  padding: 0;
}
.btn-click {
  @apply transition-transform duration-100 active:scale-90 select-none outline-none ring-0;
}
.type1 {
  @apply max-w-[400px] w-[65%] h-[72px] text-[24px];
}

.disabled {
  @apply bg-[linear-gradient(to_bottom,_#6D638A_50%,_#5D537A_50%,_#6D638A_100%)] pointer-events-none;
}
</style>
