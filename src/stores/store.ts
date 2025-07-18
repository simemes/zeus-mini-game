import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
  state: () => ({
    // server related
    api: 'https://simm-dev-441009.de.r.appspot.com/api/v1/',
    token: '',
    users_profile: {
      userId: '',
      name: '',
      referralUrl: ''
    },
    users_referrals: {
      referrals: [
        {
          id: '1234',
          name: 'You dont have any referrals',
          claimed: false
        },
        {
          id: '5678',
          name: 'jerry',
          claimed: false
        },
      ]
    },
    games_data: {
      todayPlayCount: 0,
      maxPlayCount: 1,
      highScore: 0,
      lastPlayedAt: ''
    },
    games_start: {
      gameplayId: ''
    },
    games_finish: {
      gameplayId: '',
      score: 0
    },
    // 票卡購買相關
    orders_data_daily_pass: {
      purchaseCount: 0,
      purchaseLimit: 1,
      purchaseLimitResetAt: ''
    },
    orders_invoice_daily_pass: {
      invoiceLink: ''
    },
    orders_data_golden_pass: {
      purchaseCount: 0,
      purchaseLimit: 1,
      purchaseLimitResetAt: ''
    },
    orders_invoice_golden_pass: {
      invoiceLink: ''
    },
    user_id: null,
    score: 0,
    rank: 0,
    purchaseNum: 75,
    finalDay: '08/31',
    referrals_used_today: false,
    // non-server related
    isLogin: false,
    device: '',
    isMobile: false,
    stage: 1,
    stageTime: 60,
    fortuneType: 0,
    isReady: false,
    loadingProgress: 0,
    isPreloaded: false,
    resultLoaded : false,
    isStart: false,
    isBuyChance: false,
    isBuyPass: false,
    isResult: false,
    isPaused: false,
    isReferralsPanel: false,
    knockOut: false,
    canInvincible: false,
    invincible: false,
    knockoutCooling: false,
    LoadingPage: {
      title: 'Loading'
    },
    startPage: {
      title: 'Start'
    },
    pausePage: {
      title: 'Pause'
    },
    resultPage: {
      title: 'Result'
    }
  }),
  actions: {
    // setName(newName: string) {
    //   this.name = newName
    // },
  },
})