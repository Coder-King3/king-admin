import type { RouteRecordRaw } from 'vue-router'

import { DEFAULT_HOME_PATH, LOGIN_PATH } from '@/constants'
import Login from '@/views/auth/login.vue'
import { AuthPageLayout } from '@/layouts'

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
        name: 'Login',
        path: 'login',
        component: Login,
        meta: {
          title: 'login'
        }
      },
      {
        name: 'Register',
        path: 'register',
        component: () => import('@/views/auth/register.vue'),
        meta: {
          title: 'register'
        }
      },
      {
        name: 'ForgetPassword',
        path: 'forgetPassword',
        component: () => import('@/views/auth/forget-password.vue'),
        meta: {
          title: 'forgetPassword'
        }
      }
    ]
  },
  // Test
  {
    name: 'Test',
    path: '/test',
    component: () => import('@/views/test.vue'),
    meta: {
      title: 'test'
    }
  }
]

/** fallback 404/403/500路由 */
const fallbackRoutes: RouteRecordRaw[] = [
  {
    component: () => import('@/views/fallback/not-found.vue'),
    meta: {
      title: '404'
    },
    name: 'FallbackNotFound',
    path: '/:path(.*)*'
  },
  {
    component: () => import('@/views/fallback/forbidden.vue'),
    meta: {
      title: '403'
    },
    name: 'Fallback403',
    path: '/403'
  },
  {
    component: () => import('@/views/fallback/not-found.vue'),
    meta: {
      title: '404'
    },
    name: 'Fallback404',
    path: '/404'
  },
  {
    component: () => import('@/views/fallback/internal-error.vue'),
    meta: {
      title: '500'
    },
    name: 'Fallback500',
    path: '/500'
  }
]

export { basicRoutes, fallbackRoutes }
