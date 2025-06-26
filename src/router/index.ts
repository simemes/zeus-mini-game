import { createRouter, createWebHistory } from 'vue-router'
import Main from '../components/Main.vue'
import Home from '../components/Home.vue'
import Result from '../components/Result.vue'

const routes = [
  { path: '/', component: Main },
  { path: '/home', component: Home },
  { path: '/result', component: Result },
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
