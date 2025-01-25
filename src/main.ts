import { initPreferences } from '@/preferences'

import { APP_NAMESPACE, APP_VERSION } from './constants'
import { overridesPreferences } from './settings'

/**
 * 应用初始化完成之后再进行页面加载渲染
 */
async function initApplication() {
  // 命名空间前缀 用于 cache 等
  const env = import.meta.env.PROD ? 'prod' : 'dev'
  const namespace = `${APP_NAMESPACE}-${APP_VERSION}-${env}`

  // app偏好设置初始化
  await initPreferences({ namespace, overrides: overridesPreferences })

  // 启动应用并挂载
  // vue应用主要逻辑及视图
  const { bootstrap } = await import('./bootstrap')
  await bootstrap(namespace)
}

initApplication()
