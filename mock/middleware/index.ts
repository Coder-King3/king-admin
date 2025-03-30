import type { Middleware } from '../types'

import { defaultMiddleware } from './default'

export * from './default'

const middlewares: Middleware[] = [defaultMiddleware]

export { middlewares }
