<template>
  <!-- box -->
  <div class="relative w-[90%] flex flex-col justify-center items-center bg-[linear-gradient(to_bottom,_#BC621B_0%,_#823900_100%)] rounded-[20px] p-5 border-[2px] border-[#3A1D07]">
    <!-- close -->
    <div @click="Close" class="absolute -top-2 -right-2 w-[10%] z-1 pointer-events-auto">
      <img :src="close" class="">
    </div>
    <!-- pic -->
    <div @click="Close" class="absolute -top-11 left-4 w-[30%] z-1 pointer-events-auto">
      <img :src="zPass" class="rotate-[-15deg]">
    </div>
    <div class="strokeText-3 flex-1 mb-5 sm:text-[20px] md:text-[30px] lg:text-[40px] xl:text-[50px]" data-stroke="Zeus Golden Pass">Zeus Golden Pass</div>
    <!-- items -->
    <div class="relative w-[100%] flex flex justify-around bg-[#6C2F00] rounded-[8px] p-3 mx-10 mb-5">
      <div class="w-[100%] relative flex flex-col justify-center items-center my-2">
        <div class="strokeText-2 flex justify-start items-center px-3 sm:text-[14px] md:text-[24px] lg:text-[34px] xl:text-[44px]">
          <img :src="xStar" class="w-[5%] mx-1">
          <div>Get one extra play per day untill {{ $store.finalDay }}</div>
        </div>
      </div>
    </div>
    <!-- reached limit hint -->
    <div v-if="$store.orders_data_golden_pass.purchaseCount >= $store.orders_data_golden_pass.purchaseLimit" class="strokeText-2 mt-0 mb-2">You have purchased Zeus Golden Pass.</div>
    <!-- btn -->
    <div v-if="$store.orders_data_golden_pass.purchaseCount < $store.orders_data_golden_pass.purchaseLimit" @click="Purchase" class="btn-box btn-click">
      <div class="strokeText" data-stroke="$ 1">$ 1</div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useStore } from '../stores/store'
import axios from 'axios'
import { invoice } from '@telegram-apps/sdk';

import close from '@/assets/images/close.png'
import zPass from '@/assets/images/zeus_pass.png'
import xStar from '@/assets/images/x_star.png'

const $store = useStore()
const emit = defineEmits(['startEvent'])

// ================================== function ==================================

// 跳出付費彈窗
async function Purchase() {
  $store.isBuyPass = false;
  // 取得 orders_invoice_golden_pass
  const url_orders_invoice = $store.api + 'orders/invoice';
  try {
    const response = await axios.get(url_orders_invoice, {
      params: {
        itemId: 'golden_pass'
      },
      headers: {
        'Authorization': `tma ${$store.token}`
      }
    });
    // console.log('get orders_invoice_golden_pass:', response.data);
    // 取得 invoice link 賦值到 $store
    $store.orders_invoice_golden_pass = response.data;
    console.log('🟡orders_invoice_golden_pass:', $store.orders_invoice_golden_pass);
    // 跳出 invoiceLink 視窗
    const invoiceLink = $store.orders_invoice_golden_pass.invoiceLink;
    const status = await invoice.open(invoiceLink, 'url');
    // 根據付款結果處理
    if (status === 'paid') {
      console.log('✅ 月卡付款完成');
      await getGamesData();
    } else {
      console.log('❌ 月卡付款未完成或取消:', status);
      getGoldenPass()
    }
  } catch(error) {
    console.error('get orders_invoice_golden_pass 錯誤:', error);
  }
}

// 取得 games_data 
async function getGamesData() {
  try {
    const response = await axios.get($store.api + 'games', {
      headers: {
        'Authorization': `tma ${$store.token}`
      }
    });
    $store.games_data = response.data
    console.log('📀games_data:', $store.games_data);
  } catch (error) {
    console.error('get games_data 錯誤:', error);
  }
}

// 取得 orders_data_golden_pass
function getGoldenPass() {
  axios.get($store.api + 'orders', {
    params: {
      itemId: 'golden_pass'
    },
    headers: {
      'Authorization': `tma ${$store.token}`
    }
  })
    .then(response => {
      $store.orders_data_golden_pass = response.data
      console.log('🟡orders_data_golden_pass:', $store.orders_data_golden_pass);
    })
    .catch(error => {
      console.error('get orders_data_golden_pass 錯誤:', error);
    });
}

// 關閉 BuyChance
function Close() {
  $store.isBuyPass = false
}

// ================================== computed ==================================

// const DaysLeft = computed(() => {
//   const today = new Date();
//   const thisYear = today.getFullYear();
//   const targetDate = new Date(thisYear, 7, 31); // 月份是從 0 開始，所以 7 是 8 月
//   // 計算毫秒差距，轉成天數
//   const diffTime = targetDate.getTime() - today.getTime(); // ✅ 明確轉成 number
//   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//   return diffDays;
// })

// ================================== onMounted ==================================

onMounted(() => {
  // console.log('invoice.isSupported(): ', invoice.isSupported())
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
  @apply relative w-full text-[12px] text-[#FFFFFF] z-1 font-[800];
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
