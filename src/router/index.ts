import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/register.vue'
import Verify from '@/views/VerifyEmail.vue'
import Acceuil from '@/views/Acceuil.vue'
import Info from '@/views/Info.vue'

//Dashboard
import MainDashbordVue from '@/components/Dashboard/MainDashbord.vue'
import UserLayout from '@/views/layout/UserLayoutView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Acceuil
    },
    {
      path: '/info',
      component: Info
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/register',
      component: Register
    },

    {
      path: '/verify',
      component: Verify
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/user-layout',
      name: 'user-layout',
      component: UserLayout,
      children: [
        {
          path: '/maindashboard/:id',
          name: 'maindashboard',
          component: MainDashbordVue
        },
        
      ]
    }
  ]
})

export default router
