import type { MenuRecordRaw } from '@types'

import type { RouteRecordRaw } from 'vue-router'

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
  accessMenus: MenuRecordRaw[]
  /**
   * 可访问的路由列表
   */
  accessRoutes: RouteRecordRaw[]
  /**
   * 登录 Token
   */
  accessToken: AccessToken
  /**
   * 是否已经检查过权限
   */
  isAccessChecked: boolean
  /**
   * 登录是否过期
   */
  loginExpired: boolean
  /**
   * 登录 accessToken
   */
  refreshToken: AccessToken
}

const useAccessStore = defineStore('access', {
  actions: {
    getMenuByPath(path: string) {
      function findMenu(
        menus: MenuRecordRaw[],
        path: string
      ): MenuRecordRaw | undefined {
        for (const menu of menus) {
          if (menu.path === path) {
            return menu
          }
          if (menu.children) {
            const matched = findMenu(menu.children, path)
            if (matched) {
              return matched
            }
          }
        }
      }
      return findMenu(this.accessMenus, path)
    },
    setAccessCodes(codes: string[]) {
      this.accessCodes = codes
    },
    setAccessMenus(menus: MenuRecordRaw[]) {
      this.accessMenus = menus
    },
    setAccessRoutes(routes: RouteRecordRaw[]) {
      this.accessRoutes = routes
    },
    setAccessToken(token: AccessToken) {
      this.accessToken = token
    },
    setIsAccessChecked(isAccessChecked: boolean) {
      this.isAccessChecked = isAccessChecked
    },
    setLoginExpired(loginExpired: boolean) {
      this.loginExpired = loginExpired
    },
    setRefreshToken(token: AccessToken) {
      this.refreshToken = token
    }
  },
  persist: {
    // 持久化
    pick: ['accessToken', 'accessCodes']
  },
  state: (): AccessState => ({
    accessCodes: [],
    accessMenus: [],
    accessRoutes: [],
    accessToken: null,
    isAccessChecked: false,
    loginExpired: false,
    refreshToken: null
  })
})

export { useAccessStore }
