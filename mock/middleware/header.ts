import type { Middleware } from '../types'

import { appendHeaders, defineEventHandler } from 'h3'

const headerMiddleware: Middleware<[Record<string, string>]> = (headers) => {
  return defineEventHandler((event) => {
    appendHeaders(event, headers)
  })
}

export { headerMiddleware }
