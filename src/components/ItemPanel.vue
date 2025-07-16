<template>
  <!-- items -->
  <div class="w-[100%] h-full flex flex-col justify-center font-[Inter,sans-serif] font-bold text-[14px]">
    <!-- =================== 1st row =================== -->
    <div class="w-full h-full flex flex-row justify-center my-1">
      <!-- 1st col -->
      <div class="w-full h-full flex flex-row justify-start items-center">
        <div class="bg-[#00000040] rounded-[12px] w-[40%] p-2 mx-2">
          <img :src="gmove" class="">
        </div>
        <div>+100</div>
      </div>
      <!-- 2nd col -->
      <div class="w-full h-full flex flex-row justify-start items-center">
        <div class="bg-[#00000040] rounded-[12px] w-[40%] p-2 mx-2">
          <img :src="hat" class="">
        </div>
        <div>+150</div>
      </div>
    </div>
    <!-- =================== 2nd row =================== -->
    <div class="w-full h-full flex flex-row justify-center my-1">
      <!-- 1st col -->
      <div class="w-full h-full flex flex-row justify-start items-center">
        <div class="bg-[#00000040] rounded-[12px] w-[40%] p-2 mx-2">
          <img :src="coin" class="">
        </div>
        <div>+500</div>
      </div>
      <!-- 2nd col -->
      <div class="w-full h-full flex flex-row justify-start items-center">
        <div class="bg-[#00000040] rounded-[12px] w-[40%] p-2 mx-2">
          <img :src="thunder" class="">
        </div>
        <div>-200</div>
      </div>
    </div>
    <!-- =================== 3rd row =================== -->
    <div class="w-full h-full flex flex-row justify-center my-1">
      <div class="w-full h-full flex flex-row justify-start items-center">
        <div class="relative bg-[#00000040] rounded-[12px] w-[20%] p-2 mx-2">
          <img :src="clock" class="relative w-[90%] -top-1 -left-1">
          <img :src="clockGold" class="absolute w-[70%] top-2 right-1 -z-0">
        </div>
        <div>Adds 2 or 5 seconds.</div>
      </div>
    </div>
    <!-- =================== 4th row =================== -->
    <div class="w-full h-full flex flex-row justify-center my-1">
      <div class="w-full h-full flex flex-row justify-start items-center">
        <div class="bg-[#00000040] rounded-[12px] w-[20%] p-2 mx-2">
          <img :src="bomb" class="">
        </div>
        <div>Stuns 2 seconds.</div>
      </div>
    </div>
    <!-- =================== 5th row =================== -->
    <div class="w-full h-full flex flex-row justify-center my-1">
      <div class="w-full h-full flex flex-row justify-start items-center">
        <div class="bg-[#00000040] rounded-[12px] w-[20%] p-2 mx-2">
          <img :src="fortune" class="">
        </div>
        <div>Red pill or blue pill, your pick.</div>
      </div>
    </div>
    <!-- =================== 6th row =================== -->
    <div class="w-full h-full flex flex-row justify-center my-1">
      <div class="w-full h-full flex flex-row justify-start items-center">
        <div class="bg-[#00000040] rounded-[12px] w-[20%] p-2 mx-2">
          <img :src="star" class="">
        </div>
        <div class="flex flex-col items-start">
          <div>Immune 2 seconds</div>
          <div class="text-[12px] text-[#C87637]">(You can double tap to activate)</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import {  } from 'vue'

import bomb from '@/assets/images/bomb.png'
import clock from '@/assets/images/clock.png'
import clockGold from '@/assets/images/clock_gold.png'
import coin from '@/assets/images/coin.png'
import star from '@/assets/images/star.png'
import gmove from '@/assets/images/gmove.png'
import hat from '@/assets/images/hat.png'
import thunder from '@/assets/images/thunder.png'
import fortune from '@/assets/images/fortune.png'

</script>

<style scoped>
</style>
