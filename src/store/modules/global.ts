import { defineStore } from 'pinia'
import { useDark, useToggle } from '@vueuse/core'
import type { SupportedLanguagesType } from '@/locales'

// 使用 VueUse useDark hooks
const isDark = useDark()
const toggleDark = useToggle(isDark)

interface GlobalStore {
  /**
   * 是否黑暗模式
   */
  isDark: typeof isDark
  /**
   * 当前语言[默认中文]
   */
  locale: SupportedLanguagesType
  /**
   * ElementPlus 尺寸大小
   */
  dimension: ElementPlusUI.ThemeSize
}

export const useGlobalStore = defineStore('global', {
  persist: {},
  state: (): GlobalStore => ({
    isDark,
    locale: 'zh-CN',
    dimension: 'default'
  }),
  actions: {
    // 设置当前global.ts所有参数值
    setGlobalState(key: string, value: any) {
      this.$patch({ [key]: value })
    },
    // 切换黑暗模式
    switchDark: () => toggleDark()
  }
})
