import type { EventHandler } from 'h3'

type Middleware = EventHandler

interface MiddlewareOptions {
  cors?: boolean
  headers?: Record<string, string>
  middlewares?: Middleware[]
}

export type { Middleware, MiddlewareOptions }
