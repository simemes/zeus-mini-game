import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
  state: () => ({
    isStart: true,
    isReward: false,
    startPage: {
      title: 'Start'
    },
    rewardPage: {
      title: 'Reward'
    }
  }),
  actions: {
    // setName(newName: string) {
    //   this.name = newName
    // },
  },
})