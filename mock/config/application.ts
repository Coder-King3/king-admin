import type { applicationConfig } from '../types'

import { createApp as createH3App } from 'h3'

import { setupMiddleware } from './middleware'
import { createRouter, setupRouter } from './router'

function defineApplication(config: applicationConfig) {
  const {
    cors = false,
    h3Options = {},
    headers = {},
    middlewares,
    prefix,
    routes
  } = config
  const h3App = createH3App(h3Options)

  const router = createRouter({
    prefix,
    routes
  })

  // use router
  setupRouter(h3App, router)

  // use middleware
  setupMiddleware(h3App, {
    cors,
    headers,
    middlewares
  })

  return h3App
}

export { defineApplication }
