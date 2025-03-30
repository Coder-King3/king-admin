import type { Middleware, MiddlewareOptions } from '../types'

import { type App, defineEventHandler, setHeaders } from 'h3'

// common middlewares
function lowerCaseKeys<T extends Record<string, any>>(
  headers: T
): { [K in keyof T as Lowercase<K & string>]: T[K] } {
  const newHeaders: Record<string, any> = {} // 临时 mutable 对象
  Object.keys(headers).forEach((key) => {
    newHeaders[key.toLowerCase()] = headers[key]
  })
  return newHeaders as { [K in keyof T as Lowercase<K & string>]: T[K] }
}

const headerMiddleware = (headers: Record<string, string>) => {
  return defineEventHandler((event) => {
    setHeaders(event, headers)
  })
}

// register middlewares
function registerMiddlewares(app: App, middlewares: Middleware[]) {
  middlewares.forEach((middleware) => {
    app.use(middleware)
  })
}

function setupMiddleware(app: App, options: MiddlewareOptions) {
  const { cors = false, middlewares = [] } = options

  let { headers = {} } = options

  // CORS
  if (cors) {
    headers = {
      'access-control-allow-headers': '*',
      'access-control-allow-methods': '*',
      'access-control-allow-origin': '*',
      'access-control-max-age': '0',
      ...lowerCaseKeys(headers)
    }
  }

  // Headers
  if (headers) {
    app.use(headerMiddleware(headers))
  }

  registerMiddlewares(app, middlewares)
}

function createMiddleware(middleware: Middleware) {
  return defineEventHandler(middleware)
}

export { createMiddleware, setupMiddleware }
