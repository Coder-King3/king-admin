<script setup lang="ts">
import { onMounted } from 'vue'

import { APP_TITLE, APP_VERSION } from '@/constants'

import { elementLocale } from './locales'

/*
declare global {
  const __KING_ADMIN_METADATA__: {
    authorEmail: string
    authorName: string
    authorUrl: string
    homepage: string
    license: string
    version: string
  }
}
*/

// 打印项目信息
const printProjectInfo = async () => {
  const createInfoStyle = (radius: string, background: string) =>
    `padding: 2px 1px; border-radius: ${radius}; color: #fff; background: ${background}; font-weight: bold;`

  // eslint-disable-next-line no-console
  console.log(
    `%c ${APP_TITLE} %c V${APP_VERSION} `,
    createInfoStyle('3px 0 0 3px', '#6169FF'),
    createInfoStyle('0 3px 3px 0', '#42c02e')
  )
}

onMounted(() => {
  printProjectInfo()
})
</script>

<template>
  <ElConfigProvider :locale="elementLocale">
    <RouterView />
  </ElConfigProvider>
</template>
