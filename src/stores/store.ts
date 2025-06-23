import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
  state: () => ({
    msg: 'Vite'
  }),
  actions: {
    // setName(newName: string) {
    //   this.name = newName
    // },
  },
})