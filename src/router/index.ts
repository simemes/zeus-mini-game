import { createRouter, createWebHistory } from 'vue-router'
import Main from '../components/Main.vue'
import Start from '../components/Start.vue'
import Start2 from '../components/Start2.vue'
import Result from '../components/Result.vue'

const routes = [
  { path: '/', component: Main },
  { path: '/start', component: Start },
  { path: '/start2', component: Start2 },
  { path: '/result', component: Result },
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
