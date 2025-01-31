import type { RouteRecordNameGeneric, RouteRecordRaw } from 'vue-router'

import { traverseTreeValues } from '@/utils'

import { basicRoutes, fallbackRoutes } from './basic'

/* 常驻路由 */
// const constantRoutes: RouteRecordRaw[] = [];
/* 外部路由 */
// const externalRoutes: RouteRecordRaw[] = [];

/* 路由列表，由基本路由和兜底路由组成  */
const routes: RouteRecordRaw[] = [
  ...basicRoutes,
  ...fallbackRoutes
  // ,...externalRoutes
]

/** 基本路由列表，这些路由无需权限拦截 */
const basicRouteNames: RouteRecordNameGeneric[] = traverseTreeValues(
  basicRoutes,
  (route) => route.name
)

export { basicRouteNames, routes }
