import type { MockMethod } from 'vite-plugin-mock'

import {
  prependPrefix,
  requestParams,
  useResponseError,
  useResponseSuccess,
  verifyAccessToken
} from '../utils/_index'

const routes: MockMethod[] = [
  {
    url: prependPrefix('/user/info'),
    method: 'get',
    response: (request: requestParams) => {
      const userinfo = verifyAccessToken(request)
      if (!userinfo) {
        return useResponseError('Unauthorized Exception')
      }

      return useResponseSuccess(userinfo)
    }
  }
]

export default routes
