import { createRoutesGroup } from '../config'
import auth from './auth'
import menu from './menu'
import user from './user'

const routes = createRoutesGroup([
  {
    prefix: '/auth',
    routes: auth
  },
  {
    prefix: '/user',
    routes: user
  },
  {
    prefix: '/menu',
    routes: menu
  }
])

export { routes }
