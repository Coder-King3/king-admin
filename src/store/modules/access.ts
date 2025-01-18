// import type { RouteRecordRaw } from 'vue-router'

import { defineStore } from 'pinia'

type AccessToken = null | string

interface AccessState {
  /**
   * 权限码
   */
  accessCodes: string[]
  /**
   * 可访问的菜单列表
   */
  accessMenus: any[]
  /**
   * 登录 Token
   */
  accessToken: AccessToken
  /**
   * 可访问的路由列表
   */
  // accessRoutes: RouteRecordRaw[]
  /**
   * 是否已经检查过权限
   */
  isAccessChecked: boolean
}

const useAccessStore = defineStore('access', {
  persist: {
    // 持久化
    pick: ['accessToken', 'accessCodes']
  },
  state: (): AccessState => ({
    accessToken: null,
    accessCodes: [],
    accessMenus: [],
    isAccessChecked: false
    // loginExpired: false
    // accessRoutes: [],
  }),
  actions: {
    setAccessCodes(codes: string[]) {
      this.accessCodes = codes
    },
    setAccessMenus(menus: any[]) {
      this.accessMenus = menus
    },
    setAccessToken(token: AccessToken) {
      this.accessToken = token
    },
    // setAccessRoutes(routes: RouteRecordRaw[]) {
    //   this.accessRoutes = routes;
    // },
    setIsAccessChecked(isAccessChecked: boolean) {
      this.isAccessChecked = isAccessChecked
    }
    // setLoginExpired(loginExpired: boolean) {
    //   this.loginExpired = loginExpired
    // }
  }
})

export { useAccessStore }
