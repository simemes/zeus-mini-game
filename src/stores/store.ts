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
        { id: '1', name: 'Oliver', claimed: false },
        { id: '2', name: 'Jerry', claimed: false },
        { id: '3', name: 'Sophia', claimed: false },
        { id: '4', name: 'Liam', claimed: false },
        { id: '5', name: 'Emma', claimed: false },
        { id: '6', name: 'Noah', claimed: false },
        { id: '7', name: 'Ava', claimed: false },
        { id: '8', name: 'Lucas', claimed: false },
        { id: '9', name: 'Mia', claimed: false },
        { id: '10', name: 'Ethan', claimed: false },
        { id: '11', name: 'Isabella', claimed: false },
        { id: '12', name: 'Mason', claimed: false },
        { id: '13', name: 'Amelia', claimed: false },
        { id: '14', name: 'Logan', claimed: false },
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