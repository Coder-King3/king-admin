import type { RouterHistory, RouterScrollBehavior } from 'vue-router'
import { createWebHashHistory, createWebHistory } from 'vue-router'

// 路由访问两种模式：带#号的哈希模式，正常路径的web模式。
const routeMode = import.meta.env.VITE_ROUTER_MODE
const historyMode: any = {
  hash: () => createWebHashHistory(),
  history: () => createWebHistory()
}
export const history: RouterHistory = historyMode[routeMode]()

// 滚动行为
export const scrollBehavior: RouterScrollBehavior = (
  to,
  _from,
  savedPosition
) => {
  if (savedPosition) {
    return savedPosition
  }
  return to.hash ? { behavior: 'smooth', el: to.hash } : { left: 0, top: 0 }
}
