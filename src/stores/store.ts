import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
  state: () => ({
    isStart: true,
    isResult: false,
    MainPage: {
      title: 'Start'
    },
    startPage: {
      title: 'Start'
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