import type { RouteRecordRaw } from 'vue-router'

import { DEFAULT_HOME_PATH, LOGIN_PATH } from '@/constants'
import { AuthPageLayout } from '@/layouts'
import Login from '@/views/auth/login.vue'

/** 基本路由，这些路由是必须存在的 */
const basicRoutes: RouteRecordRaw[] = [
  {
    meta: {
      title: 'Root'
    },
    name: 'Root',
    path: '/',
    redirect: DEFAULT_HOME_PATH
  },
  {
    component: AuthPageLayout,
    meta: {
      hideInTab: true,
      title: 'Authentication'
    },
    name: 'Authentication',
    path: '/auth',
    redirect: LOGIN_PATH,
    children: [
      {
        component: Login,
        meta: {
          title: 'login'
        },
        name: 'Login',
        path: 'login'
      },
      {
        component: () => import('@/views/auth/register.vue'),
        meta: {
          title: 'register'
        },
        name: 'Register',
        path: 'register'
      },
      {
        component: () => import('@/views/auth/forget-password.vue'),
        meta: {
          title: 'forgetPassword'
        },
        name: 'ForgetPassword',
        path: 'forgetPassword'
      }
    ]
  },
  // Test
  {
    component: () => import('@/views/test.vue'),
    meta: {
      title: 'test'
    },
    name: 'Test',
    path: '/test'
  }
]

/** fallback 全局404/403页面 */
const fallbackRoutes: RouteRecordRaw[] = [
  {
    alias: '/:pathMatch(.*)*',
    component: () => import('@/views/fallback/not-found.vue'),
    meta: {
      title: 'NotFound'
    },
    name: 'FallbackNotFound',
    path: '/404'
  },
  {
    component: () => import('@/views/fallback/forbidden.vue'),
    meta: {
      title: '403'
    },
    name: 'Fallback403',
    path: '/403'
  }
]

export { basicRoutes, fallbackRoutes }
