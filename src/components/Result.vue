<template>
  <!-- 預載入圖片後遮罩消失 -->
  <transition leave-active-class="transition-opacity duration-300 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
    <div v-if="!$store.resultLoaded" class="absolute w-full h-full bg-white z-10"></div>
  </transition>
  <div
      class="relative inset-0 aspect-[720/1280] max-w-screen max-h-screen z-[1] pointer-events-none overflow-hidden bg-black flex flex-col justify-center"
    >
    <!-- gold bg -->
    <div class="relative overflow-hidden [clip-path:ellipse(100%_85%_at_50%_0%)]">
      <img :src="bgGold" class="w-full h-full object-cover object-top -z-1 ">
      <img :src="pepeChest" class="absolute bottom-6 left-1/2 -translate-x-1/2 w-[80%]">
      <img :src="zeusLogo" class="absolute top-3 left-1/2 -translate-x-1/2 w-[23%]">
    </div>
    <div class="relative">
      <img :src="gameResult" class="absolute bottom-5 left-1/2 -translate-x-1/2 w-[60%]">
    </div>
    <!-- 深藍邊線 -->
    <div class="bg-[#012D57] absolute top-13 left-0 w-full h-full object-cover -z-2 [clip-path:ellipse(100%_45%_at_50%_0%)]"></div>
    <!-- 漸層區 -->
    <div class="bg-white absolute top-0 left-0 w-full h-full object-cover -z-3 bg-[linear-gradient(to_bottom,_#074375_50%,_#002B55_100%)]"></div>
    <!-- 內容區 -->
    <div class="w-[70%] mx-auto h-full flex flex-col justify-center items-center">

      <!-- Rank & Score -->
      <div class="relative w-full flex flex-col justify-center items-center font-[900]">
        <!-- score -->
        <div class="w-[65%]">
          <div class="text-[14px] font-[700]">Your current score</div>
          <div class="bg-[#00000060] rounded-full text-[18px] my-1 py-1">
            <div>{{ $store.score || 0 }}</div>
          </div>
        </div>
        <!-- high score -->
        <div class="text-[#FFEB89] mt-3">
          <div class="text-[14px] strokeText-2 font-[700]" data-stroke="Your highest score and rankings">Your highest score and rankings</div>
          <div class="text-[18px] strokeText-2" :data-stroke="displayedScore">{{ displayedScore }}</div>
        </div>
        <!-- high ranking -->
        <div class="text-[12px] text-[#FFEB89] mb-3 font-[700]">You are in top {{ $store.rank || 0 }}%</div>
      </div>
      <!-- Share & Accepted friends & Play Again -->
      <div class="w-full flex justify-between">

        <div @click="Share" class="btn-box btn-click mr-2">
          <div class="strokeText " data-stroke="Share">Share</div>
        </div>

        <div @click="ShowAcceptedPanel"  class="btn-box-2 btn-click">
          <div class=""></div>
          <img :src="acceptedFriends" class="absolute top-[10px] sm:top-[8px] md:top-[6px] left-1/2 -translate-x-1/2 max-w-[20%] max-h-[35px] aspect-square">
        </div>

      </div>
      <div @click="GoToStart" class="btn-box btn-click" :class="{ disabled: btnIsDisabled}" :disabled="btnIsDisabled">
        <div class="strokeText " data-stroke="Play Again">Play Again</div>
      </div>
      <!-- footer text -->
      <div class="text-[11px] mb-5 font-[700]">
        Share with frens to get extra ticket.
      </div>
    </div>

    <div v-if="$store.isAcceptedPanel" class="absolute top-0 left-0 w-full h-full">
      <!-- AcceptedPanel mask -->
      <div @click="CloseMask"  class="backdrop-blur-[5px] bg-[#00000070] absolute top-0 left-0 w-full h-full z-2 pointer-events-auto"></div>
      <!-- AcceptedPanel -->
      <div class="absolute top-0 z-3 w-full h-full flex flex-col justify-center items-center" ref="acceptedPanelTrans">
        <AcceptedPanel ></AcceptedPanel>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useStore } from '../stores/store'
import AcceptedPanel from '../components/AcceptedPanel.vue'
import { animate, createSpring } from 'animejs';
// import { shareURL } from '@telegram-apps/sdk';
// import axios from 'axios';

import bgGold from '@/assets/images/gold_background.jpg'
import pepeChest from '@/assets/images/pepe_in_chest.png'
import zeusLogo from '@/assets/images/zeus_drop_logo.png'
import gameResult from '@/assets/images/game_results.png'
import acceptedFriends from '@/assets/images/accepted_frens.png'


const $store = useStore()
import { useRouter } from 'vue-router'
const router = useRouter()

const acceptedPanelTrans = ref(null)

// 預載入圖片
const imageList: string[] = [
  new URL('@/assets/images/gold_background.jpg', import.meta.url).href,
  new URL('@/assets/images/game_results.png', import.meta.url).href,
  new URL('@/assets/images/pepe_in_chest.png', import.meta.url).href,
  new URL('@/assets/images/zeus_drop_logo.png', import.meta.url).href,
  new URL('@/assets/images/accepted_frens.png', import.meta.url).href,
];

let btnIsDisabled = ref(true)

// ================================== computed ==================================

// const btnIsDisabled = computed(() => {
//   let result
//   // console.log($store.users_profile.todayPlayCount, $store.users_profile.maxPlayCount)
//   if($store.users_profile.todayPlayCount >= $store.users_profile.maxPlayCount) {
//     result = true
//   } else {
//     result = false
//   }
//   return result
// })


const displayedScore = computed(() => {
    return ($store.users_profile.highScore > $store.score)
      ? $store.users_profile.highScore
      : $store.score;
})

// ================================== watch ==================================

watch(acceptedPanelTrans, () => {
  if (acceptedPanelTrans.value) {
    animate(acceptedPanelTrans.value, {
      translateY: [ 100, 0 ],
      opacity: [ 0, 1 ],
      delay: 0,
      duration: 300,
      ease: createSpring({ stiffness: 120 }),
    })
  }
})

// ================================== function ==================================

function Share() {
  // console.log(btnIsDisabled)
  btnIsDisabled.value = false
  // console.log(btnIsDisabled)

  // try {
  //   const link = `https://t.me/SIMemes_bot?startapp=${$store.user_id}`
  //   if (shareURL.isAvailable()) {
  //     shareURL(link, '⚡️ let\'s play with zeus!');
  //   }
  // }
  // catch (error) {
  //   console.log("[Telegram.WebApp]: ", error);
  // }
}

function GoToStart() {
  $store.score = 0

  $store.stageTime = 60,
  $store.fortuneType = 0,
  $store.isReady = false,
  $store.loadingProgress = 0,
  $store.isPreloaded = false,
  $store.resultLoaded  = false,
  $store.isStart = false,
  $store.isBuyChance = false,
  $store.isBuyPass = false,
  $store.isResult = false,
  $store.isPaused = false,
  $store.knockOut = false,
  $store.canInvincible = false,
  $store.invincible = false,
  $store.knockoutCooling = false,
  
  router.push('/')
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

function ShowAcceptedPanel() {
  // console.log('ShowAcceptedPanel!')
  $store.isAcceptedPanel = true
}

function CloseMask() {
  // console.log('CloseMask!')
  $store.isAcceptedPanel = false
}

// ================================== onMounted ==================================

onMounted(async() => {
  // $store.users_profile.todayPlayCount = 1
  // $store.users_profile.maxPlayCount = 1
  // 預載入圖片
  await preloadImages(imageList);
  $store.resultLoaded = true; 

  // 結束遊戲 (把結果送到server/ 還有另一種可能是玩家關掉 app 時)
  // const url_finish = $store.api + 'games/finish';
  // axios.post(url_finish, {
  //   score: $store.score
  // }, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `tma ${$store.token}`
  //   }
  // })
  //   .then(response => {
  //     console.log('post 結束遊戲:', response.data);
  //   })
  //   .catch(error => {
  //     console.error('post 結束遊戲錯誤:', error);
  //     console.error('錯誤訊息:', error.response?.data);
  //   });
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

.btn-box {
  @apply text-center my-[2px] text-[#FFFFFF] font-[900];
  @apply shadow-[inset_0px_-4px_0px_0px_#00000040] bg-[linear-gradient(to_bottom,_#FFDC30_50%,_#F8C022_50%,_#F8C022_90%,_#FFDC30_100%)];
  @apply h-[48px] w-full rounded-[8px] -z-1 relative pointer-events-auto;
  border: 1px solid black !important;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  touch-action: manipulation;
}
.btn-box-2 {
  @apply text-center my-[2px] text-[#FFFFFF] font-[900];
  @apply shadow-[inset_0px_-4px_0px_0px_#00000040] bg-[linear-gradient(to_bottom,_#057ACB_50%,_#0460A8_50%,_#0460A8_90%,_#057ACB_100%)];
  @apply h-[48px] w-full rounded-[8px] -z-1 relative pointer-events-auto;
  border: 1px solid black !important;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  touch-action: manipulation;
}
.disabled {
  @apply bg-[linear-gradient(to_bottom,_#858191_50%,_#736F80_50%,_#858191_100%)] pointer-events-none text-[#9A95A7];
}
.btn-click {
  @apply transition-transform duration-100 active:scale-90 select-none outline-none ring-0;
}
.strokeText {
  @apply relative top-[14px] w-full text-[14px];
}
.strokeText::before {
  content: attr(data-stroke);
  -webkit-text-stroke: 3px black;
  text-stroke: 3px black;
  @apply absolute top-[0px] left-[0px] w-full -z-1;
}

.strokeText-2 {
  @apply relative w-full;
}
.strokeText-2::before {
  content: attr(data-stroke);
  -webkit-text-stroke: 2.5px #A4510C;
  text-stroke: 2.5px #A4510C;
  @apply absolute top-[0px] left-[0px] w-full -z-1;
}
</style>
