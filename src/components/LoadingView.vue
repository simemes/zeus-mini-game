<template>
  <div class="absolute translate-x-[calc(50vw-50%)] translate-y-[calc(50vh-50%)] inset-0 aspect-[720/1280] max-w-full max-h-full z-[1] pointer-events-none overflow-hidden">

    <div class="absolute top-0 z-2 w-full h-full flex flex-col justify-center">
      <!-- bg -->
      <img src="/images/simemes_bg.png" class="absolute top-0 left-0 w-full h-full object-cover -z-10 pointer-events-none">

      <div class="w-full h-full flex flex-col justify-center items-center">

        <!-- zeus_drop_logo -->
         <div class="flex flex-4 w-[60%]">
          <img src="/images/zeus_drop_logo.png" class="object-contain">
         </div>

        <!-- Loading -->
        <div class="flex-1 font-[700] text-[14px]">
          <p>Loading ... {{ progress }}%</p>
        </div>

      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useStore } from '../stores/store'
import { useRouter } from 'vue-router'
const router = useRouter()
const $store = useStore()
const progress = ref(0)

const imageUrls = [
  // '/images/simemes_bg.png',
  // '/images/zeus_drop_logo.png',

  './images/bg_blue_sky.jpg',
  './images/bg_cyan.png',
  './images/bg_gold.png',
  './images/bg_black.png',
  './images/arrow_l.png',
  './images/arrow_r.png',
  './images/bomb.png',
  './images/clock.png',
  './images/clock_gold.png',
  './images/clock_icon.png',
  './images/coin.png',
  './images/gmove.png',
  './images/hat.png',
  './images/invincible.png',
  './images/knockout.png',
  './images/pause_btn.png',
  './images/pepe_in_chest.png',
  './images/player.png',
  './images/poseidon.png',
  './images/simemes_logo.png',
  './images/smoke.png',
  './images/star.png',
  './images/thunder.png',
  './images/fortune.png',
  './images/time_bar.png',
  './images/zeus.png',
]

const audioUrls = [
  ''
  // './sounds/Score.mp3',
  // './sounds/Descore.mp3',
  // './sounds/BGM.mp3',
  // './sounds/Bomb.mp3',
  // './sounds/Completed.mp3',
  // './sounds/TimeCountdown.mp3'
]

const total = imageUrls.length + audioUrls.length
// const total = imageUrls.length
let loaded = 0

function updateProgress() {
  loaded++
  progress.value = Math.floor((loaded / total) * 100)
}

function preloadImages() {
  return Promise.all(imageUrls.map(url => new Promise<void>((resolve) => {
    const img = new Image()
    img.src = url
    img.onload = () => {
      updateProgress()
      resolve()
    }
    img.onerror = () => {
      updateProgress()
      resolve()
    }
  })))
}

function preloadAudio() {
  return Promise.all(audioUrls.map(url => new Promise<void>((resolve) => {
    const audio = new Audio()
    audio.src = url
    audio.oncanplaythrough = () => {
      updateProgress()
      resolve()
    }
    audio.onerror = () => {
      updateProgress()
      resolve()
    }
  })))
}

// ============= 切換頁面 =============

onMounted(async() => {
  if($store.isMobile) {
    await preloadImages()
    await preloadAudio()
    console.log('🔥[preload]!')
    router.push('/game')
  }
  
})

</script>

<style scoped>
</style>
