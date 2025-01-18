import type { Recordable } from '@/types'

import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { getAccessCodesApi, getUserInfoApi, loginApi } from '@/api'
import { DEFAULT_HOME_PATH } from '@/constants'
import { $t } from '@/locales'
import { type BasicUserInfo, useAccessStore, useUserStore } from '@/store'

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

  // userInfo
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

  return {
    authLogin,
    loginLoading
  }
})

export { useAuthStore }
