import type { Component } from 'vue'
import type { Router, RouteRecordRaw } from 'vue-router'

interface RouteMeta {
  [key: string]: any
}

// 定义递归类型以将 RouteRecordRaw 的 component 属性更改为 string
type RouteRecordStringComponent<T = string> = {
  children?: RouteRecordStringComponent<T>[]
  component: T
} & Omit<RouteRecordRaw, 'children' | 'component'>

type ComponentRecordType = Record<string, () => Promise<Component>>

interface GenerateMenuAndRoutesOptions {
  fetchMenuListAsync?: () => Promise<RouteRecordStringComponent[]>
  layoutMap?: ComponentRecordType
  pageMap?: ComponentRecordType
  router: Router
}

export type {
  ComponentRecordType,
  GenerateMenuAndRoutesOptions,
  RouteMeta,
  RouteRecordRaw,
  RouteRecordStringComponent
}
