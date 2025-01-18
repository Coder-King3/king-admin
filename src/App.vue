<script setup lang="ts">
import { onMounted } from 'vue'

import { APP_NAME } from '@/constants'
import { storeToRefs, useAppStore } from '@/store'

import { loadLocaleMessages } from './locales'
import { setThemeMode } from './utils'

const { dimension, isDark, locale } = storeToRefs(useAppStore())

// 打印项目信息
const printProjectInfo = async () => {
  const { version } = await import('../package.json')

  const createInfoStyle = (radius: string, background: string) =>
    `padding: 2px 1px; border-radius: ${radius}; color: #fff; background: ${background}; font-weight: bold;`

  // eslint-disable-next-line no-console
  console.log(
    `%c ${APP_NAME} %c V${version} `,
    createInfoStyle('3px 0 0 3px', '#6169FF'),
    createInfoStyle('0 3px 3px 0', '#42c02e')
  )
}

// 初始化语言配置
const initThemeConfig = () => {
  setThemeMode(isDark.value ? 'dark' : 'light')
}

// 初始化语言配置
const initI18nConfig = async () => {
  await loadLocaleMessages(locale.value)
}

onMounted(() => {
  printProjectInfo()
  initThemeConfig()
  initI18nConfig()
})
</script>

<template>
  <ElConfigProvider :size="dimension">
    <RouterView />
  </ElConfigProvider>
</template>
