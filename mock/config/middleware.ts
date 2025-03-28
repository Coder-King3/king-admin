import type { App } from 'h3'

import type { Middleware, MiddlewareOptions } from '../types'

import { corsMiddleware, headerMiddleware } from '../middleware'
import { isObject } from '../utils/inference'

function setupMiddleware(app: App, options: MiddlewareOptions) {
  const { cors = false, headers = {}, middlewares = [] } = options

  // 如果开启 CORS，注册对应的中间件
  if (cors) {
    app.use(corsMiddleware())
  }

  // 只有 headers 对象非空时才注册 header 中间件
  if (isObject(headers) && Object.keys(headers).length > 0) {
    app.use(headerMiddleware(headers))
  }

  registerMiddlewares(app, middlewares)
}

// 注册自定义中间件
function registerMiddlewares(app: App, middlewares: Middleware[]) {
  middlewares.forEach((middleware) => {
    app.use(middleware())
  })
}

export { setupMiddleware }
