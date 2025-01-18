export interface UserInfo {
  id: number
  username: string
  password: string
  realName: string
  roles: string[]
}

export const MOCK_USERS: UserInfo[] = [
  {
    id: 0,
    username: 'king',
    password: '123456',
    realName: 'King',
    roles: ['super']
  },
  {
    id: 1,
    username: 'admin',
    password: '123456',
    realName: 'Admin',
    roles: ['admin']
  },
  {
    id: 2,
    username: 'ck',
    password: '123456',
    realName: 'Ck',
    roles: ['user']
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
    redirect: '/analytics',
    children: [
      {
        name: 'Analytics',
        path: '/analytics',
        component: '/dashboard/analytics/index',
        meta: {
          icon: 'lucide:area-chart',
          title: 'page.dashboard.analytics',
          affixTab: true
        }
      },
      {
        name: 'Workspace',
        path: '/workspace',
        component: '/dashboard/workspace/index',
        meta: {
          icon: 'carbon:workspace',
          title: 'page.dashboard.workspace'
        }
      }
    ]
  }
]

const createDemosMenus = (role: 'admin' | 'super' | 'user') => {
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
        {
          name: 'AccessDemos',
          path: '/demosaccess',
          meta: {
            icon: 'mdi:cloud-key-outline',
            title: 'demos.access.backendPermissions'
          },
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
  ]
}

export const MOCK_MENUS = [
  {
    menus: [...dashboardMenus, ...createDemosMenus('super')],
    username: 'king'
  },
  {
    menus: [...dashboardMenus, ...createDemosMenus('admin')],
    username: 'admin'
  },
  {
    menus: [...dashboardMenus, ...createDemosMenus('user')],
    username: 'ck'
  }
]
