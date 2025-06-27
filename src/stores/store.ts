import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
  state: () => ({
    stage2: false,
    stage3: false,
    isLoadPage: true,
    isLoaded: false,
    resultLoaded : false,
    isStart: false,
    isResult: false,
    isPaused: false,
    totalScore: 0,
    highScore: 0,
    rank: 0,
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