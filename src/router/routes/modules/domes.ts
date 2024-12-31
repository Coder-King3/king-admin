import type { RouteRecordRaw } from 'vue-router'
import { BasicLayout } from '@/layouts'

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'ic:baseline-view-in-ar',
      keepAlive: true,
      order: 1000
      // title: $t('demos.title'),
    },
    name: 'Demos',
    path: '/demos',
    children: [
      // 缺省页
      {
        meta: {
          icon: 'mdi:lightbulb-alert-outline'
          // title: $t('demos.fallback.title'),
        },
        name: 'FallbackDemos',
        path: '/demos/fallback',
        children: [
          {
            name: 'Fallback403Demo',
            path: '/demos/fallback/403',
            component: () => import('@/views/fallback/forbidden.vue'),
            meta: {
              icon: 'ic:baseline-do-not-disturb',
              title: '403'
            }
          },
          {
            name: 'Fallback404Demo',
            path: '/demos/fallback/404',
            component: () => import('@/views/fallback/not-found.vue'),
            meta: {
              icon: 'mdi:table-off',
              title: '404'
            }
          },
          {
            name: 'Fallback500Demo',
            path: '/demos/fallback/500',
            component: () => import('@/views/fallback/internal-error.vue'),
            meta: {
              icon: 'mdi:server-network-off',
              title: '500'
            }
          }
          // {
          //   name: 'FallbackOfflineDemo',
          //   path: '/demos/fallback/offline',
          //   component: () => import('#/views/_core/fallback/offline.vue'),
          //   meta: {
          //     icon: 'ion:cloud-offline-outline'
          //     // title: $t('ui.fallback.offline'),
          //   }
          // }
        ]
      }
    ]
  }
]

export default routes
