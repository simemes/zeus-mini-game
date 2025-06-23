import { createRouter, createWebHistory } from 'vue-router'
import Start from '../components/Start.vue'
import Reward from '../components/Reward.vue'

const routes = [
  { path: '/', component: Start },
  { path: '/reward', component: Reward },
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
