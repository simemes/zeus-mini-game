// import { createRouter, createWebHashHistory } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import LoadingView from '../components/LoadingView.vue'
import Game from '../components/Game.vue'
import Result from '../components/Result.vue'

const routes = [
  { path: '/', component: LoadingView },
  { path: '/game', component: Game },
  { path: '/result', component: Result },
]

export const router = createRouter({
  // history: createWebHashHistory(),
  history: createWebHistory(),
  routes
})
