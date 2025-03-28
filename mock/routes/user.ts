import type { RouteConfig } from '../types'

import { verifyAccessToken } from '../utils/jwt-util'
import { unAuthorizedResponse, useResponseSuccess } from '../utils/response'

const routes: RouteConfig[] = [
  {
    handler: (event) => {
      const userinfo = verifyAccessToken(event)
      if (!userinfo) {
        return unAuthorizedResponse(event)
      }
      return useResponseSuccess(userinfo)
    },
    method: 'get',
    url: '/info'
  }
]

export { routes as user }
