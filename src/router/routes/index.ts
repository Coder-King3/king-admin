import type { RouteRecordRaw } from 'vue-router'
import { basicRoutes, fallbackRoutes } from './constant'
// import { mergeRouteModules } from '../helper'

/* 动态路由 */
// const dynamicRoutes: RouteRecordRaw[] = mergeRouteModules(
//   import.meta.glob('./modules/**/*.ts', {
//     eager: true
//   })
// )

// console.log(`dynamicRoutes:`, dynamicRoutes)

/* 路由列表，由基本路由和兜底路由组成  */
const routes: RouteRecordRaw[] = [...basicRoutes, ...fallbackRoutes]

export { routes }
