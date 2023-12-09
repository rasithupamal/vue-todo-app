import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GuestLayout from "@/views/layouts/GuestLayout.vue";
import LoginPage from "@/views/pages/auth/LoginPage.vue";
import RegisterPage from "@/views/pages/auth/RegisterPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/auth',
      component: GuestLayout,
      children: [
        {
          path: 'login',
          name: 'auth.login',
          component: LoginPage
        },
        {
          path: 'register',
          name: 'auth.register',
          component: RegisterPage
        },
      ]
    }
  ]
})

export default router
