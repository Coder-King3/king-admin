import {
  createRouter,
  createWebHashHistory,
  createWebHistory
} from 'vue-router'
import { createRouterGuard } from './guard'
import { routes } from './routes'

// 路由访问两种模式：带#号的哈希模式，正常路径的web模式。
const mode = import.meta.env.VITE_ROUTER_MODE
const routerMode: any = {
  hash: () => createWebHashHistory(),
  history: () => createWebHistory()
}

// 创建路由器对象
const router = createRouter({
  // 路由模式hash或者默认不带#
  history: routerMode[mode](),
  routes,
  // 滚动行为
  scrollBehavior: (to, _from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    }
    return to.hash ? { behavior: 'smooth', el: to.hash } : { left: 0, top: 0 }
  },
  // 是否应该禁止尾部斜杠。
  strict: false
})

// 创建路由守卫
createRouterGuard(router)

export { router }
