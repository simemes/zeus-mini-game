import { createRouter, createWebHistory } from 'vue-router'
import Loading from '../components/Loading.vue'
import Game from '../components/Game.vue'
import Result from '../components/Result.vue'

const routes = [
  { path: '/', component: Loading },
  { path: '/game', component: Game },
  { path: '/result', component: Result },
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
