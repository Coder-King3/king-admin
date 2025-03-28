import type { Middleware } from '../types'

import { appendCorsHeaders, defineEventHandler } from 'h3'

const corsMiddleware: Middleware = () => {
  return defineEventHandler((event) => {
    appendCorsHeaders(event, {
      allowHeaders: '*',
      maxAge: '0',
      methods: '*',
      origin: '*'
    })
  })
}

export { corsMiddleware }
