import type { RouteRecordNameGeneric, RouteRecordRaw } from 'vue-router'

// import { mergeRouteModules } from '../helper'
import { traverseTreeValues } from '@/utils'

import { basicRoutes, fallbackRoutes } from './basic'

/* 静态路由 */
// const constantRoutes: RouteRecordRaw[] = mergeRouteModules(
//   import.meta.glob('./modules/**/*.ts', {
//     eager: true
//   })
// )
// console.log(`constantRoutes:`, constantRoutes)
/* 外部路由 */
// const externalRoutes: RouteRecordRaw[] = [];

/* 路由列表，由基本路由和兜底路由组成  */
const routes: RouteRecordRaw[] = [...basicRoutes, ...fallbackRoutes]

/** 基本路由列表，这些路由无需权限拦截 */
const basicRouteNames: RouteRecordNameGeneric[] = traverseTreeValues(
  basicRoutes,
  (route) => route.name
)

export { basicRouteNames, routes }
