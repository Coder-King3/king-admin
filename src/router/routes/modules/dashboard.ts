import type { RouteRecordRaw } from 'vue-router'
import { BasicLayout } from '@/layouts'

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'lucide:layout-dashboard',
      order: -1
      // title: $t('page.dashboard.title')
    },
    name: 'Dashboard',
    path: '/',
    children: [
      {
        name: 'Analytics',
        path: '/analytics',
        component: () => import('@/views/dashboard/analysis/index.vue'),
        meta: {
          affixTab: true,
          icon: 'lucide:area-chart'
          // title: $t('page.dashboard.analytics')
        }
      },
      {
        name: 'Workspace',
        path: '/workspace',
        component: () => import('@/views/dashboard/workspace/index.vue'),
        meta: {
          icon: 'carbon:workspace'
          // title: $t('page.dashboard.workspace')
        }
      }
    ]
  }
]

export default routes
