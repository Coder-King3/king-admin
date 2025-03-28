import type { EventHandler } from 'h3'

// 请求方法类型
type HTTPMethod = 'delete' | 'get' | 'patch' | 'post' | 'put'

// 单个路由配置
interface RouteConfig {
  handler: EventHandler // 处理函数
  method?: HTTPMethod // 请求方法
  url: string // 路由 URL
}

// 路由组配置
interface RoutesGroup {
  prefix: string // 路由前缀
  routes: RouteConfig[] // 该组内的路由
}

// 全局路由配置
interface RouterOptions {
  prefix?: string // 全局前缀
  routes: RouteConfig[] // 全部路由
}

export type { HTTPMethod, RouteConfig, RouterOptions, RoutesGroup }
