import type {
  RouteLocationNormalized,
  RouteRecordNameGeneric,
  RouterHistory
} from 'vue-router'
import { createWebHashHistory, createWebHistory } from 'vue-router'

//  免登录白名单（匹配路由 name）
export const whiteListByName: RouteRecordNameGeneric[] = []
// 判断是否在白名单
export function isWhiteList(
  to: RouteLocationNormalized,
  whiteList: RouteRecordNameGeneric[]
) {
  // path 和 name 任意一个匹配上即可
  // whiteList.includes(to.path)
  return whiteList.includes(to.name)
}

// 路由访问两种模式：带#号的哈希模式，正常路径的web模式。
const routeMode = import.meta.env.VITE_ROUTER_MODE
const historyMode: any = {
  hash: () => createWebHashHistory(),
  history: () => createWebHistory()
}
export const mode: RouterHistory = historyMode[routeMode]()
