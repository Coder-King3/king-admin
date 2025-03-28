import type { Middleware } from './middleware'

import { AppOptions } from 'h3'

import { RouteConfig } from './router'

interface applicationConfig {
  /** app cors */
  cors?: boolean
  /** h3 AppOptions */
  h3Options?: AppOptions
  /** router headers */
  headers?: Record<string, string>
  /** app middlewares */
  middlewares?: Middleware[]
  /** global prefix */
  prefix?: string
  /** router routes */
  routes: RouteConfig[]
}

export type { applicationConfig }
