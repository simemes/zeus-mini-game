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
    games_data: {
      todayPlayCount: 0,
      maxPlayCount: 1,
      highScore: 0,
      lastPlayedAt: ''
    },
    games_start: {
      gameplayId: ''
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
    purchaseNum: 24,
    finalDay: '08/31',
    isPassTime: false,
    ticketCount: 3,
    accepted_friends: ['@telegram_account-1','@telegram_account-2','@telegram_account-3'],
    // non-server related
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
    isAcceptedPanel: false,
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