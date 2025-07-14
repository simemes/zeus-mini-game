<template>
  <div class="absolute translate-x-[calc(50vw-50%)] translate-y-[calc(50vh-50%)] inset-0 aspect-[720/1280] max-w-full max-h-full z-[1] pointer-events-none overflow-hidden">
    <div class="absolute top-0 z-2 w-full h-full flex flex-col justify-center">
      <!-- bg -->
      <img src="/images/simemes_bg.png" class="absolute top-0 left-0 w-full h-full object-cover -z-10 pointer-events-none">

      <div class="w-[80%] h-full mx-auto flex flex-col justify-center items-center">
        <div class="strokeText" data-stroke="For better gaming experience, please switch to the telegram mobile app.">For better gaming experience, please switch to the telegram mobile app.</div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.strokeText {
  @apply relative w-full text-[16px] text-[#FFFFFF] z-1 font-[800];
}
.strokeText::before {
  content: attr(data-stroke);
  -webkit-text-stroke: 2.5px black;
  text-stroke: 2.5px black;
  @apply absolute top-[0px] left-[0px] w-full -z-1;
}
</style>