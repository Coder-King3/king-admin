import { createRouter } from 'vue-router'

import { history, scrollBehavior } from './config'
import { createRouterGuard } from './guard'
import { routes } from './routes'

// 创建路由器对象
const router = createRouter({
  // 路由模式hash或者默认不带#
  history,
  routes,
  // 滚动行为
  scrollBehavior,
  // 是否应该禁止尾部斜杠。
  strict: false
})

// 创建路由守卫
createRouterGuard(router)

export { router }
