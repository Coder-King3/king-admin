<script setup lang="ts">
import { onMounted } from 'vue'
import { APP_NAME } from '@/constants'
import { storeToRefs, useGlobalStore } from '@/store'
import { loadLocaleMessages } from './locales'

const { dimension, locale } = storeToRefs(useGlobalStore())

onMounted(() => {
  printProjectInfo()
  initI18nConfig()
})

// 打印项目信息
const printProjectInfo = async () => {
  const { version } = await import('../package.json')
  console.log(
    `%c ${APP_NAME} %c V${version} `,
    'padding: 2px 1px; border-radius: 3px 0 0 3px; color: #fff; background: #6169FF; font-weight: bold;',
    'padding: 2px 1px; border-radius: 0 3px 3px 0; color: #fff; background: #42c02e; font-weight: bold;'
  )
}

// 初始化语言配置
const initI18nConfig = async () => {
  await loadLocaleMessages(locale.value)
}
</script>

<template>
  <ElConfigProvider :size="dimension">
    <RouterView></RouterView>
  </ElConfigProvider>
</template>
