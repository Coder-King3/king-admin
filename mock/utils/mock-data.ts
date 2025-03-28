export interface UserInfo {
  id: number
  password: string
  realName: string
  roles: string[]
  username: string
}

export const MOCK_USERS: UserInfo[] = [
  {
    id: 0,
    password: '123456',
    realName: 'King',
    roles: ['super'],
    username: 'king'
  },
  {
    id: 1,
    password: '123456',
    realName: 'Admin',
    roles: ['admin'],
    username: 'admin'
  },
  {
    id: 2,
    password: '123456',
    realName: 'Ck',
    roles: ['user'],
    username: 'ck'
  }
]

export const MOCK_CODES = [
  // super
  {
    codes: ['AC_Query', 'AC_Create', 'AC_Delete', 'AC_Update', 'AC_Clear'],
    username: 'king'
  },
  {
    // admin
    codes: ['AC_Query', 'AC_Create', 'AC_Delete', 'AC_Update'],
    username: 'admin'
  },
  {
    // user
    codes: ['AC_Query', 'AC_Create'],
    username: 'ck'
  }
]

const dashboardMenus = [
  {
    component: 'BasicLayout',
    meta: {
      icon: 'lucide:layout-dashboard',
      order: -1,
      title: 'page.dashboard.title'
    },
    name: 'Dashboard',
    path: '/',
    redirect: '/workspace',
    children: [
      {
        name: 'Workspace',
        path: '/workspace',
        component: '/dashboard/workspace/index',
        meta: {
          icon: 'carbon:workspace',
          title: 'page.dashboard.workspace'
        }
      },
      {
        name: 'Analytics',
        path: '/analytics',
        component: '/dashboard/analytics/index',
        meta: {
          icon: 'lucide:area-chart',
          title: 'page.dashboard.analytics'
        }
      }
    ]
  }
]

const createDemosAccessMenus = (role: 'admin' | 'super' | 'user') => {
  const roleWithMenus = {
    admin: {
      component: '/demos/access/admin-visible',
      meta: {
        icon: 'mdi:button-cursor',
        title: 'demos.access.adminVisible'
      },
      name: 'AccessAdminVisibleDemo',
      path: '/demos/access/admin-visible'
    },
    super: {
      component: '/demos/access/super-visible',
      meta: {
        icon: 'mdi:button-cursor',
        title: 'demos.access.superVisible'
      },
      name: 'AccessSuperVisibleDemo',
      path: '/demos/access/super-visible'
    },
    user: {
      component: '/demos/access/user-visible',
      meta: {
        icon: 'mdi:button-cursor',
        title: 'demos.access.userVisible'
      },
      name: 'AccessUserVisibleDemo',
      path: '/demos/access/user-visible'
    }
  }

  return [
    {
      meta: {
        icon: 'mdi:cloud-key-outline',
        title: 'demos.access.backendPermissions'
      },
      name: 'AccessDemos',
      path: '/demosaccess',
      redirect: '/demos/access/page-control',
      children: [
        {
          name: 'AccessPageControlDemo',
          path: '/demos/access/page-control',
          component: '/demos/access/index',
          meta: {
            icon: 'mdi:page-previous-outline',
            title: 'demos.access.pageAccess'
          }
        },
        {
          name: 'AccessButtonControlDemo',
          path: '/demos/access/button-control',
          component: '/demos/access/button-control',
          meta: {
            icon: 'mdi:button-cursor',
            title: 'demos.access.buttonControl'
          }
        },
        {
          name: 'AccessMenuVisible403Demo',
          path: '/demos/access/menu-visible-403',
          component: '/demos/access/menu-visible-403',
          meta: {
            authority: ['no-body'],
            icon: 'mdi:button-cursor',
            menuVisibleWithForbidden: true,
            title: 'demos.access.menuVisible403'
          }
        },
        roleWithMenus[role]
      ]
    }
  ]
}
const demosMenus = (role: 'admin' | 'super' | 'user') => [
  {
    component: 'BasicLayout',
    meta: {
      icon: 'ic:baseline-view-in-ar',
      keepAlive: true,
      order: 1000,
      title: 'demos.title'
    },
    name: 'Demos',
    path: '/demos',
    redirect: '/demos/access',
    children: [
      // 权限页
      ...createDemosAccessMenus(role),
      // 缺省页
      {
        children: [
          {
            component: '/fallback/forbidden',
            meta: {
              icon: 'ic:baseline-do-not-disturb',
              title: '403'
            },
            name: 'Fallback403Demo',
            path: '/demos/fallback/403'
          },
          {
            component: '/fallback/not-found',
            meta: {
              icon: 'mdi:table-off',
              title: '404'
            },
            name: 'Fallback404Demo',
            path: '/demos/fallback/404'
          },
          {
            component: '/fallback/internal-error',
            meta: {
              icon: 'mdi:server-network-off',
              title: '500'
            },
            name: 'Fallback500Demo',
            path: '/demos/fallback/500'
          }
          // {
          //   name: 'FallbackOfflineDemo',
          //   path: '/demos/fallback/offline',
          //   component: '/fallback/offline',
          //   meta: {
          //     icon: 'ion:cloud-offline-outline'
          //     // title: 'ui.fallback.offline',
          //   }
          // }
        ],
        meta: {
          icon: 'mdi:lightbulb-alert-outline',
          title: 'demos.fallback.title'
        },
        name: 'FallbackDemos',
        path: '/demos/fallback'
      }
    ]
  }
]

export const MOCK_MENUS = [
  {
    menus: [...dashboardMenus, ...demosMenus('super')],
    username: 'king'
  },
  {
    menus: [...dashboardMenus, ...demosMenus('admin')],
    username: 'admin'
  },
  {
    menus: [...dashboardMenus, ...demosMenus('user')],
    username: 'ck'
  }
]
