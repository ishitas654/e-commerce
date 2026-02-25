import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/products'
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: () => import('../views/SignIn.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: () => import('../views/SignUp.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/products',
      name: 'Products',
      component: () => import('../views/Products.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/signin')
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next('/products')
  } else {
    next()
  }
})

export default router
