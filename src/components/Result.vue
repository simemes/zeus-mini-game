<template>
  <!-- 預載入圖片後遮罩消失，目的是蓋住 Game Start 畫面 -->
  <transition leave-active-class="transition-opacity duration-300 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
    <div v-if="!$store.resultLoaded" class="absolute w-full h-full bg-white z-10"></div>
  </transition>
  <div
      class="relative inset-0 aspect-[720/1280] max-w-screen max-h-screen z-[1] pointer-events-none overflow-hidden bg-black flex flex-col justify-center"
    >
    <!-- gold bg -->
    <div class="relative overflow-hidden [clip-path:ellipse(100%_85%_at_50%_0%)]">
      <img src="/images/gold_background.jpg" class="w-full h-full object-cover object-top -z-1 ">
      <img src="/images/pepe_in_chest.png" class="absolute bottom-6 left-1/2 -translate-x-1/2 w-[80%]">
    </div>
    <div class="relative">
      <img src="/images/game_results.png" class="absolute bottom-5 left-1/2 -translate-x-1/2 w-[60%]">
    </div>
    <!-- 深藍邊線 -->
    <div class="bg-[#012D57] absolute top-13 left-0 w-full h-full object-cover -z-2 [clip-path:ellipse(100%_45%_at_50%_0%)]"></div>
    <!-- 漸層區 -->
    <div class="bg-white absolute top-0 left-0 w-full h-full object-cover -z-3 bg-[linear-gradient(to_bottom,_#074375_50%,_#002B55_100%)]"></div>
    <!-- 內容區 -->
    <div class="w-[70%] mx-auto h-full flex flex-col justify-center items-center">
      <!-- Rank & Score -->
      <div class="flex-1 relative w-full flex flex-col justify-around items-center">
        <div class="bg-[#00000040] rounded-[8px] w-full p-2 mx-2 flex justify-between">
          <div>Ranking</div>
          <div>{{ $store.rank || 0 }}</div>
        </div>
        <div class="bg-[#00000040] rounded-[8px] w-full p-2 mx-2 flex justify-between">
          <div>Score</div>
          <div>{{ $store.totalScore || 0 }}</div>
        </div>
        <div class="bg-[#00000040] rounded-[8px] w-full p-2 mx-2 flex justify-between">
          <div>High Score</div>
          <div>{{ ($store.highScore > $store.totalScore)?$store.highScore:$store.totalScore }}</div>
        </div>
      </div>
      <!-- Share & Play Again -->
      <div class="flex-1 relative w-full flex flex-col justify-center items-center">
        <button @click="Share" class="btn btn-click type1 pointer-events-auto">Share</button>
        <button @click="GoToStart" class="btn btn-click type1 pointer-events-auto" :class="{ disabled: btnIsDisabled}" :disabled="btnIsDisabled">Play Again</button>
      </div>
      <!-- footer text -->
      <div class="text-[11px] mb-5">
        Players who share will get 1 additional play for the day.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useStore } from '../stores/store'
const $store = useStore()
// import { useRouter } from 'vue-router'
// const router = useRouter()

// 預載入圖片
const imageList: string[] = [
  './images/gold_background.jpg',
  './images/game_results.png',
  './images/pepe_in_chest.png',
];

let btnIsDisabled = ref(true)

function Share() {
  console.log(btnIsDisabled)
  btnIsDisabled.value = false
  console.log(btnIsDisabled)
}

function GoToStart() {
  $store.totalScore = 0
  $store.isStart = false
  $store.isLoaded = false
  $store.resultLoaded = false
  $store.isResult = false
  $store.stage = 1
  $store.stageTime = 60
  $store.canInvincible = false
  $store.invincible = false
  // router.push('/')
}

// 預載入圖片
function preloadImages(imageUrls: string[]) {
  console.log("[zeus]: preloadImages from Home ...")
  return Promise.all(
    imageUrls.map(
      (src) =>
        new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        })
    )
  );
}

onMounted(async() => {
  // 預載入圖片
  await preloadImages(imageList);
  $store.resultLoaded = true; 
})
</script>

<style scoped>

.circle-layout {
  /* width: 680; */
  height: 680;
  top: -258px;
  left: -152px;
  border-width: 6px;
  background: #FFFFFF;
  border: 6px solid #08143E;
  box-shadow: 0px 4px 4px 0px #00000040;
}

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
  @apply w-[100%] h-[48px] text-[14px];
}

.disabled {
  @apply bg-[linear-gradient(to_bottom,_#6D638A_50%,_#5D537A_50%,_#6D638A_100%)] pointer-events-none;
}
</style>
