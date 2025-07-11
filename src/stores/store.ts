import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
  state: () => ({
    users_profile: {
      todayPlayCount: 1,
      maxPlayCount: 1,
      highScore: 0,
      lastPlayedAt: 0
    },
    user_id: null,
    score: 0,
    rank: 0,
    api: 'https://simm-dev-441009.de.r.appspot.com/api/v1/',
    token: '',

    stage: 1,
    stageTime: 60,
    fortuneType: 0,
    isLoaded: false,
    isReady: false,
    isPreloaded: false,
    resultLoaded : false,
    isStart: false,
    isBuyChance: false,
    isBuyPass: false,
    isPassTime: false,
    passLeft: 30,
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