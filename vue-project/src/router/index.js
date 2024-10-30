import { createRouter, createWebHistory } from 'vue-router'
import MiniProject from '../views/MiniProject.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {
      path: '/',
      name: 'Home',
      component: MiniProject
    },
  ]
})

export default router
