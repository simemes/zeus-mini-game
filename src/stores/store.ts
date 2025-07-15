import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
  state: () => ({
    // server related
    users_profile: {
      todayPlayCount: 0,
      maxPlayCount: 1,
      highScore: 0,
      lastPlayedAt: 0
    },
    user_id: null,
    score: 0,
    rank: 0,
    api: 'https://simm-dev-441009.de.r.appspot.com/api/v1/',
    token: '',
    purchaseNum: 24,
    finalDay: '08/31',
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
    isPassTime: false,
    isResult: false,
    isPaused: false,
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