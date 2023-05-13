import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import {useAuthStore} from "@/stores/authStore";
import SignUpView from "@/views/SignUpView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }, // ログインが必要
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresAuth: false },  // ログイン不要
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView,
      meta: { requiresAuth: false },  // ログイン不要
    },
  ]
})

router.beforeEach((to) => {
  const authStore = useAuthStore()


  // metaで
  if (to.meta.requiresAuth &&  authStore.auth === undefined) {
    // ログインしていないときにログインページに飛ばす
    return {
      // ログインページのパス
      name: 'login',
      // ログイン後にリダイレクトするページのパスをクエリに保存
      query: {
        redirect: to.fullPath
      },
    }
  }
})

export default router
