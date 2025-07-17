<template>

  <div v-if="$store.isMobile" class="w-full h-full flex items-center justify-center"><router-view /></div>
  
  <div v-if="!$store.isMobile">
    <MobilOnlyView></MobilOnlyView>
  </div>

</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { init,postEvent } from '@telegram-apps/sdk';
import { useStore } from './stores/store'
import MobilOnlyView from './components/MobileOnlyView.vue'
import axios from 'axios';
const $store = useStore()
// const token = ref('')

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

  // 從 <script src="https://telegram.org/js/telegram-web-app.js?58"> 引入的 sdk
  // 目前抓 userinfo 只能從這裡
  try {
    const tg = (window as any).Telegram.WebApp;
    const user = tg.initDataUnsafe?.user;
    const init_data = tg.initData;
    const startParam = tg.initDataUnsafe?.start_param;
    // console.log("[Telegram.WebApp] - user: ", user);
    console.log("經由", startParam, "推薦進來的");
    // console.log("init_data: ", init_data);
    $store.user_id = user.id

    // ============================== 登入取得 token ==============================
    const url_login = $store.api + 'users/login';
    axios.post(url_login, {
      data: init_data
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        // console.log('post users_login:', response.data);
        $store.token = response.data.token

        // ============================== 取得 users_profile ==============================
        const url_user_profile = $store.api + 'users/profile';
        axios.get(url_user_profile, {
          headers: {
            'Authorization': `tma ${$store.token}`
          }
        })
          .then(response => {
            // console.log('get users_profile:', response.data);
            // 賦值到 $store
            $store.users_profile = response.data
            console.log('👶users_profile:', $store.users_profile);
          })
          .catch(error => {
            console.error('get users_profile 錯誤:', error);
          });

        // ============================== 取得 games_data ==============================
        const url_games = $store.api + 'games';
        axios.get(url_games, {
          headers: {
            'Authorization': `tma ${$store.token}`
          }
        })
          .then(response => {
            // console.log('get games_data:', response.data);
            // 賦值到 $store
            $store.games_data = response.data
            console.log('📀games_data:', $store.games_data);
            // const date = new Date($store.games_data.lastPlayedAt * 1000);
            // console.log(date.toString());
          })
          .catch(error => {
            console.error('get games_data 錯誤:', error);
          });
        
        // ============================== 取得 orders_data_daily_pass ==============================
        const url_orders = $store.api + 'orders';
        axios.get(url_orders, {
          params: {
            itemId: 'daily_pass'
          },
          headers: {
            'Authorization': `tma ${$store.token}`
          }
        })
          .then(response => {
            // console.log('get orders_data_daily_pass:', response.data);
            // 賦值到 $store
            $store.orders_data_daily_pass = response.data
            console.log('⚪️orders_data_daily_pass:', $store.orders_data_daily_pass);
          })
          .catch(error => {
            console.error('get orders_data_daily_pass 錯誤:', error);
          });
        
        // ============================== 取得 orders_data_golden_pass ==============================
        axios.get(url_orders, {
          params: {
            itemId: 'golden_pass'
          },
          headers: {
            'Authorization': `tma ${$store.token}`
          }
        })
          .then(response => {
            // console.log('get orders_data_golden_pass:', response.data);
            // 賦值到 $store
            $store.orders_data_golden_pass = response.data
            console.log('🟡orders_data_golden_pass:', $store.orders_data_golden_pass);
          })
          .catch(error => {
            console.error('get orders_data_golden_pass 錯誤:', error);
          });

      })
      .catch(error => {
        console.error('login 請求錯誤:', error);
      });

  }
  catch (error) {
    console.log("[Telegram.WebApp]: ", error);
  }

  $store.device = getOS()
  console.log("作業系統是:", $store.device);
  // alert($store.device)
  try {
    // 初始化 @telegram-apps/sdk-vue
    init();
    postEvent('web_app_expand')
    postEvent('web_app_toggle_orientation_lock', { locked: true })
    // 若是 mobile 就滿版
    if ($store.device == 'iOS' || $store.device == 'Android' || $store.device == 'Windows Phone' || $store.device == 'iPadOS') {
      postEvent('web_app_request_fullscreen')
      $store.isMobile = true
    }
  } catch (error) {
    console.log('[telegram-apps/sdk]: ',  error);
  }

})

</script>

<style scoped>
</style>
