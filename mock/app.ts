import { defineApplication } from './config'
import errorHandler from './error'
import { middlewares } from './middleware'
import { routes } from './routes'

export const app = defineApplication({
  cors: true,
  h3Options: {
    onError: errorHandler
  },
  headers: {
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers':
      'Accept, Authorization, Content-Length, Content-Type, If-Match, If-Modified-Since, If-None-Match, If-Unmodified-Since, X-CSRF-TOKEN, X-Requested-With',
    'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Expose-Headers': '*'
  },
  middlewares,
  prefix: '/api',
  routes
})
