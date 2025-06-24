<template>
  <div class="w-full h-full flex items-center justify-center"><router-view /></div>
  
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { init,postEvent } from '@telegram-apps/sdk';


// 作業系統
const getOS = () => {
  const userAgent = window.navigator.userAgent;
  const isTouch = 'ontouchstart' in window;
  if (/windows phone/i.test(userAgent)) {
    return "Windows Phone";
  }
  if (/win/i.test(userAgent)) {
    return "Windows";
  }
  if (/android/i.test(userAgent)) {
    return "Android";
  }
  if (/iPad|iPhone|iPod/.test(userAgent)) {
    return "iOS";
  }
  if (/Macintosh/.test(userAgent)) {
    // 若是 Mac，但支援觸控，基本上就是 iPad 偽裝成桌面
    return isTouch ? "iPadOS" : "macOS";
  }
  if (/Linux/.test(userAgent)) {
    return "Linux";
  }
  return "Unknown";
}

onMounted(() => {

  // 從 <script src="https://telegram.org/js/telegram-web-app.js"> 引入的 sdk
  // 目前抓 userinfo 只能從這裡
  try {
    const tg = (window as any).Telegram.WebApp;
    const user = tg.initDataUnsafe?.user;
    console.log("[Telegram.WebApp] - user: ", user);
  }
  catch (error) {
    console.log("[Telegram.WebApp]: ", error);
  }

  try {
    // 初始化 @telegram-apps/sdk-vue
    init();
    postEvent('web_app_expand')
    postEvent('web_app_toggle_orientation_lock', { locked: true })
    // 若是 mobile 就滿版
    if (getOS() == 'iOS' || getOS() == 'Android' || getOS() == 'Windows Phone' || getOS() == 'iPadOS') {
      postEvent('web_app_request_fullscreen')
      console.log("作業系統是:", getOS(), " web_app_request_fullscreen");
    }
  } catch (error) {
    console.log('[telegram-apps/sdk]: ',  error);
  }

})

</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
