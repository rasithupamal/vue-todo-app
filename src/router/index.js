import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/pages/home/HomePage.vue'
import GuestLayout from "@/views/layouts/GuestLayout.vue";
import LoginPage from "@/views/pages/auth/LoginPage.vue";
import RegisterPage from "@/views/pages/auth/RegisterPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: '/auth',
      component: GuestLayout,
      meta: {
        guest: true
      },
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


router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem('token') == null) {
      next({
        name: 'auth.login'
      })
    } else {
      next()

    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (localStorage.getItem('token') == null) {
      next()
    } else {
      next({ name: 'home' })
    }
  } else {
    next()
  }
})


export default router
