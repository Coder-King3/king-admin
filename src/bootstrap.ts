import { useTitle } from '@vueuse/core'
import { createApp, watchEffect } from 'vue'

import { registerBaseUI } from '@/baseui'
// import { registerComponents } from "@/components";
// import { registerDirectives } from "@/directives";
import '@/desgin'
import { $t, setupI18n } from '@/locales'
import { preferences } from '@/preferences'
import { router } from '@/router'
import { initStores } from '@/store'

import App from './App.vue'

import 'default-passive-events'

import '@unocss/reset/sanitize/assets.css'
import '@unocss/reset/sanitize/sanitize.css'
import 'nprogress/nprogress.css'
import 'virtual:uno.css'

async function bootstrap(namespace: string) {
  const app = createApp(App)

  // 国际化 i18n 配置
  await setupI18n(app)

  // 配置 pinia-store
  await initStores(app, { namespace })

  // 配置路由及路由守卫
  app.use(router)

  // 注册全局组件 [Base-ui/Components]
  registerBaseUI(app)
  // registerComponents(app)

  // 注册全局指令 [Directives]
  // registerDirectives(app)

  // 动态更新标题
  watchEffect(() => {
    if (preferences.app.dynamicTitle) {
      const routeTitle = router.currentRoute.value.meta?.title as string
      const pageTitle =
        (routeTitle ? `${$t(routeTitle)} - ` : '') + preferences.app.name
      useTitle(pageTitle)
    }
  })

  app.mount('#app')
}

export { bootstrap }
