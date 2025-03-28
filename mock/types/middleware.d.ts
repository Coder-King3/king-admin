import type { EventHandler } from 'h3'

type Middleware<T extends any[] = []> = (...args: T) => EventHandler

interface MiddlewareOptions {
  cors?: boolean
  headers?: Record<string, string>
  middlewares?: Middleware[]
}

export type { Middleware, MiddlewareOptions }
