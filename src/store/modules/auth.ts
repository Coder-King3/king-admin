import type { Recordable } from '@/types'

import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { getAccessCodesApi, getUserInfoApi, loginApi, logoutApi } from '@/api'
import { DEFAULT_HOME_PATH, LOGIN_PATH } from '@/constants'
import { $t } from '@/locales'
import {
  type BasicUserInfo,
  resetAllStores,
  useAccessStore,
  useUserStore
} from '@/store'

import { ElNotification } from 'element-plus'
import { defineStore } from 'pinia'

// import { useAccessStore } from './access'
// import { useUserStore, type BasicUserInfo } from './user'
// import { useRouter } from 'vue-router'

const useAuthStore = defineStore('auth', () => {
  const accessStore = useAccessStore()
  const userStore = useUserStore()
  const router = useRouter()

  const loginLoading = ref(false)

  // 异步处理登录操作
  async function authLogin(params: Recordable) {
    let userInfo: null | BasicUserInfo = null

    try {
      loginLoading.value = true
      const { accessToken } = await loginApi(params)

      // 未获取到 AccessToken 直接返回
      if (!accessToken) return

      // 存储 AccessToken
      accessStore.setAccessToken(accessToken)

      // 获取用户信息并存储
      const [getUserInfoResult, accessCodes] = await Promise.all([
        getUserInfoApi(),
        getAccessCodesApi()
      ])

      userInfo = getUserInfoResult

      userStore.setUserInfo(userInfo)
      accessStore.setAccessCodes(accessCodes)

      // 跳转到首页
      router.push(DEFAULT_HOME_PATH)

      if (userInfo?.realName) {
        ElNotification.success({
          title: $t('auth.loginSuccess'),
          message: `${$t('auth.loginSuccessDesc')}:${userInfo?.realName}`,
          duration: 3
        })
      }
    } finally {
      loginLoading.value = false
    }

    return {
      userInfo
    }
  }

  async function logout(redirect: boolean = true) {
    try {
      await logoutApi()
    } catch {
      // 不做任何处理
    }
    resetAllStores()
    // accessStore.setLoginExpired(false);

    // 回登录页带上当前路由地址
    await router.replace({
      path: LOGIN_PATH,
      query: redirect
        ? {
            redirect: encodeURIComponent(router.currentRoute.value.fullPath)
          }
        : {}
    })
  }

  async function fetchUserInfo() {
    let userInfo: null | BasicUserInfo = null
    userInfo = await getUserInfoApi()
    userStore.setUserInfo(userInfo)
    return userInfo
  }

  return {
    authLogin,
    logout,
    fetchUserInfo,
    loginLoading
  }
})

export { useAuthStore }
