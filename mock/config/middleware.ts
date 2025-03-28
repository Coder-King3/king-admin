import type { App } from 'h3'

import type { Middleware, MiddlewareOptions } from '../types'

import { headerMiddleware } from '../middleware'
import { isObject } from '../utils/inference'

function setupMiddleware(app: App, options: MiddlewareOptions) {
  const { cors = false, middlewares = [] } = options
  console.log(` cors:`, cors)

  let { headers = {} } = options

  // CORS
  if (cors) {
    headers = {
      'access-control-allow-headers': '*',
      'access-control-allow-methods': '*',
      'access-control-allow-origin': '*',
      'access-control-max-age': '0',
      ...headers
    }
  }

  console.log(` headers:`, headers)

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
