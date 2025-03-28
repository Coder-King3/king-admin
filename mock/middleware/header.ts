import type { Middleware } from '../types'

import { defineEventHandler, setResponseHeaders } from 'h3'

const headerMiddleware: Middleware<[Record<string, string>]> = (headers) => {
  return defineEventHandler((event) => {
    setResponseHeaders(event, headers)
  })
}

export { headerMiddleware }
