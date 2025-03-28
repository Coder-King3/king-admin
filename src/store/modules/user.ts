import type { BasicUserInfo } from '@types'

import { defineStore } from 'pinia'

interface AccessBasicUserInfo extends BasicUserInfo {
  [key: string]: any
}

interface AccessState {
  /** 用户信息 */
  userInfo: AccessBasicUserInfo | null
  /** 用户角色 */
  userRoles: string[]
}

const useUserStore = defineStore('user', {
  actions: {
    setUserInfo(userInfo: AccessBasicUserInfo | null) {
      // 设置用户信息
      this.userInfo = userInfo
      // 设置角色信息
      const roles = userInfo?.roles ?? []
      this.setUserRoles(roles)
    },
    setUserRoles(roles: string[]) {
      this.userRoles = roles
    }
  },
  persist: {
    pick: ['userInfo', 'userRoles'],
    storage: sessionStorage
  },
  state: (): AccessState => ({
    userInfo: null,
    userRoles: []
  })
})

export { useUserStore }
