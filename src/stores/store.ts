import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
  state: () => ({
    isStart: true,
    isResult: false,
    isPaused: false,
    totalScore: 0,
    knockOut: false,
    invincible: false,
    MainPage: {
      title: 'Start'
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