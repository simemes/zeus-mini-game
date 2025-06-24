import { createRouter, createWebHistory } from 'vue-router'
import Main from '../components/Main.vue'
import Start from '../components/Start.vue'
import Result from '../components/Result.vue'

const routes = [
  { path: '/', component: Main },
  { path: '/start', component: Start },
  { path: '/result', component: Result },
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
