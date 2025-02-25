import { defineStore } from 'pinia'

interface BasicUserInfo {
  [key: string]: any
  /** 头像 */
  avatar: string
  /** 用户昵称 */
  realName: string
  /** 用户角色 */
  roles?: string[]
  /** 用户id */
  userId: string
  /** 用户名 */
  username: string
}
interface AccessState {
  /** 用户信息 */
  userInfo: BasicUserInfo | null
  /** 用户角色 */
  userRoles: string[]
}

const useUserStore = defineStore('user', {
  actions: {
    setUserInfo(userInfo: BasicUserInfo | null) {
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

export { type BasicUserInfo, useUserStore }
