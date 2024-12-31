import { createApp } from 'vue'
import App from './App.vue'

import { router } from './router'
import { initStores } from './store'
import { setupI18n } from '@/locales'
import { registerBaseUI } from '@/baseui'
// import { registerComponents } from '@/components'
// import { registerDirectives } from "@/directives";

import '@unocss/reset/sanitize/sanitize.css'
import '@unocss/reset/sanitize/assets.css'
import '@/desgin/index.scss'
import 'animate.css'
import 'default-passive-events'
import 'virtual:uno.css'

/**
 * 应用初始化完成之后再进行页面加载渲染
 */
async function initApplication() {
  const app = createApp(App)

  // 配置 pinia-store
  await initStores(app, { namespace: import.meta.env.VITE_APP_NAMESPACE })

  // 国际化 i18n 配置
  await setupI18n(app)

  // 配置路由及路由守卫
  app.use(router)

  // 注册全局组件 [Base-ui/Components]
  registerBaseUI(app)
  // registerComponents(app)

  // 注册全局指令 [Directives]
  // registerDirectives(app)

  app.mount('#app')
}

initApplication()
