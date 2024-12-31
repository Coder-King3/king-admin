interface MenuInfo {
  id: string
  type: 'Directory' | 'Menu' | 'Button'
  name: string
  path?: string
  component?: string
  redirect?: string
  auth?: string
  meta?: Record<string, any>
  pid?: string
}

const menuTable: MenuInfo[] = [
  {
    id: 'directory:1',
    type: 'Directory',
    name: 'Dashboard',
    path: '/',
    component: 'BasicLayout',
    redirect: '/analytics',
    meta: {
      order: -1,
      title: 'page.dashboard.title'
    }
  },
  {
    id: 'menu:1_1',
    type: 'Menu',
    name: 'Analytics',
    path: '/analytics',
    component: '/dashboard/analytics/index',
    meta: {
      order: 1,
      affixTab: true,
      title: 'page.dashboard.analytics'
    },
    pid: 'menu:1'
  },
  {
    id: 'menu:1_2',
    type: 'Menu',
    name: 'Workspace',
    path: '/workspace',
    component: '/dashboard/workspace/index',
    meta: {
      order: 2,
      title: 'page.dashboard.workspace'
    },
    pid: 'menu:1'
  },
  {
    id: 'directory:2',
    type: 'Directory',
    name: 'Demos',
    path: '/demos',
    component: 'BasicLayout',
    redirect: '/demos/access',
    meta: {
      icon: 'ic:baseline-view-in-ar',
      keepAlive: true,
      order: 1000,
      title: 'demos.title'
    }
  },
  {
    id: 'directory:2_1',
    type: 'Directory',
    name: 'AccessDemos',
    path: '/demos/access',
    meta: {
      icon: 'mdi:cloud-key-outline',
      title: 'demos.access.backendPermissions'
    },
    redirect: '/demos/access/page-control',
    pid: 'directory:2'
  },
  {
    id: 'menu:2_1_1',
    type: 'Menu',
    name: 'AccessPageControlDemo',
    path: '/demos/access/page-control',
    component: '/demos/access/index',
    meta: {
      icon: 'mdi:page-previous-outline',
      title: 'demos.access.pageAccess'
    },
    pid: 'directory:2_1'
  },
  {
    id: 'menu:2_1_2',
    type: 'Menu',
    name: 'AccessButtonControlDemo',
    path: '/demos/access/button-control',
    component: '/demos/access/button-control',
    meta: {
      icon: 'mdi:button-cursor',
      title: 'demos.access.buttonControl'
    },
    pid: 'directory:2_1'
  },
  {
    id: 'menu:2_1',
    type: 'Menu',
    name: 'AccessSuperVisibleDemo',
    path: '/demos/access/super-visible',
    component: '/demos/access/super-visible',
    meta: {
      icon: 'mdi:button-cursor',
      title: 'demos.access.superVisible'
    },
    pid: 'directory:2_1'
  },
  {
    id: 'menu:2_2',
    type: 'Menu',
    name: 'AccessAdminVisibleDemo',
    path: '/demos/access/admin-visible',
    component: '/demos/access/admin-visible',
    meta: {
      icon: 'mdi:button-cursor',
      title: 'demos.access.adminVisible'
    },
    pid: 'directory:2_1'
  },
  {
    id: 'menu:2_3',
    type: 'Menu',
    name: 'AccessUserVisibleDemo',
    path: '/demos/access/user-visible',
    component: '/demos/access/user-visible',
    meta: {
      icon: 'mdi:button-cursor',
      title: 'demos.access.userVisible'
    },
    pid: 'directory:2_1'
  },
  {
    id: 'button:2_4',
    type: 'Button',
    auth: 'access:button:query',
    name: '查询',
    pid: 'directory:2_1_2'
  },
  {
    id: 'button:2_5',
    type: 'Button',
    auth: 'access:button:create',
    name: '新增',
    pid: 'directory:2_1_2'
  },
  {
    id: 'button:2_6',
    type: 'Button',
    auth: 'access:button:delete',
    name: '删除',
    pid: 'directory:2_1_2'
  },
  {
    id: 'button:2_7',
    type: 'Button',
    auth: 'access:button:update',
    name: '修改',
    pid: 'directory:2_1_2'
  },
  {
    id: 'button:2_8',
    type: 'Button',
    auth: 'access:button:clear',
    name: '删库',
    pid: 'directory:2_1_2'
  }
]

export { menuTable, type MenuInfo }
