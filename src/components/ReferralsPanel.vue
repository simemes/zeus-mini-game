<template>
  <!-- box -->
  <div class="relative w-[90%] flex flex-col justify-center items-center bg-[#C87637] rounded-[20px] p-1 border-[2px] border-[#3A1D07]">

    <!-- close -->
    <div @click="Close" class="absolute -top-2 -right-2 w-[10%] z-1 pointer-events-auto">
      <img :src="close" class="">
    </div>

    <!-- intro -->
    <div class="flex flex-col justify-center items-center my-1">
        <div class="w-[18%] mt-2">
            <img :src="zChance" class="rotate-[-15deg]">
        </div>
        <div class="w-[100%] my-2">
            <div class="play-count" :data-stroke="referralsTickets">{{ referralsTickets }}</div>
        </div>
        <div class="w-[100%] mb-2">
          <div class="text-[12px] font-[700]">you can use one referred ticket max per day.</div>
        </div>
    </div>
    
    <!-- list -->
    <div class="relative w-[100%] flex flex-col justify-center items-start bg-[#45250C] rounded-[20px] px-4 pb-5 mb-2 border-[#3A1D07] border-[2px]">
      <div v-for="referral in $store.users_referrals.referrals" class="w-full">
        <div class="flex justify-between items-center pt-5">
          <div class="text-[12px] font-[700]">{{ referral.name }}</div>

          <div class="w-[22%]">
            <!-- Claimed -->
            <div v-if="referral.claimed" class="text-[12px] font-[700] mr-2 text-[#C87637]">Claimed</div>
            <!-- Claim btn -->
            <div>
              <div v-if="!referral.claimed" @click="Claim(referral.name)" class="btn-box btn-click" :class="{ disabled: $store.referrals_used_today}" :disabled="$store.referrals_used_today">
                <div class="strokeText" data-stroke="Claim">Claim</div>
              </div>
            </div>

          </div>
          
        </div>  
        <div class="absolute w-[90%] border-b-[2px] border-[#684325] mt-2"></div>
      </div>
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

// 關閉 ReferralsPanel
function Close() {
  $store.isReferralsPanel = false
}
// Claim
function Claim(referralName: string) {
  const referral = $store.users_referrals.referrals.find(
    (r) => r.name === referralName
  );
  if (referral) {
    console.log('Claim!', referral);
    referral.claimed = true
    // api
  } else {
    console.warn('Referral not found for name:', referralName);
  }
  // 今日 claimed 過，更新 games_data

}

// ================================== computed ==================================

const referralsTickets = computed(() => {
    return `Your ticket : ${$store.users_referrals.referrals.length - 0}`;
})

// ================================== onMounted ==================================

onMounted(() => {
  // $store.games_data.todayPlayCount = 1
  // $store.games_data.maxPlayCount = 2
})

</script>

<style scoped>
.btn-box {
  @apply text-center mt-[0px] font-[800];
  @apply shadow-[inset_0px_-4px_0px_0px_#00000040] bg-[linear-gradient(to_bottom,_#50D500_50%,_#42C115_50%,_#42C115_90%,_#50D500_100%)];
  @apply rounded-[4px] relative pointer-events-auto;
  border: 1px solid black !important;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  touch-action: manipulation;
  @apply max-w-[73px] h-[30px];
}
.disabled {
  @apply bg-[linear-gradient(to_bottom,_#6D638A_50%,_#5D537A_50%,_#6D638A_100%)] pointer-events-none text-[#9A95A7];
}
.btn-click {
  @apply transition-transform duration-100 active:scale-90 select-none outline-none ring-0;
}
.strokeText {
  @apply relative top-[3px] w-full text-[14px] z-0;
}
.strokeText::before {
  content: attr(data-stroke);
  -webkit-text-stroke: 4px black;
  text-stroke: 4px black;
  @apply absolute top-[0px] left-[0px] w-full -z-1;
}

.play-count {
  @apply relative w-full text-[14px] text-[#FFFFFF] z-1 font-[700];
}
.play-count::before {
  content: attr(data-stroke);
  -webkit-text-stroke: 2.5px black;
  text-stroke: 2.5px black;
  @apply absolute top-[0px] left-[0px] w-full -z-1;
}
</style>
