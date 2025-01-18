import type { SupportedLanguagesType } from '@/locales'
import type { ThemeModeType, ThemeSize } from '@/types'

import { setThemeMode } from '@/utils'

import { defineStore } from 'pinia'

interface AppStore {
  /**
   * 默认头像
   */
  defaultAvatar: string
  /**
   * ElementPlus 尺寸大小
   */
  dimension: ThemeSize
  /**
   * 是否黑暗模式
   */
  isDark: boolean
  /**
   * 当前语言[默认中文]
   */
  locale: SupportedLanguagesType
}

const useAppStore = defineStore('app', {
  persist: {
    // 持久化
    pick: ['isDark', 'locale']
  },
  state: (): AppStore => ({
    defaultAvatar:
      'https://article.biliimg.com/bfs/article/88558ca13036274ab3714dca1bdb5680627872080.jpg@300w_300h_1e_1c.webp',
    dimension: 'default',
    isDark: false,
    locale: 'zh-CN'
  }),
  actions: {
    // 设置当前 AppStore 所有参数值
    setAppState(key: string, value: any) {
      this.$patch({ [key]: value })
    },
    // 切换黑暗模式
    switchDark(isDark: boolean, themeMode?: ThemeModeType) {
      this.isDark = isDark
      setThemeMode(themeMode ?? (isDark ? 'dark' : 'light'))
    }
  }
})

export { useAppStore }
