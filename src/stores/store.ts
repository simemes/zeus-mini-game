import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
  state: () => ({
    stage: 1,
    stageTime: 60,
    fortuneType: 0,
    isLoaded: false,
    isReady: false,
    isPreloaded: false,
    resultLoaded : false,
    isStart: false,
    isResult: false,
    isPaused: false,
    totalScore: 0,
    highScore: 0,
    rank: 0,
    totalRounds: 1,
    thisRound: 1,
    knockOut: false,
    invincible: false,
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