import type { MockMethod } from 'vite-plugin-mock'

import {
  prependPrefix,
  type requestParams,
  useResponseError,
  useResponseSuccess,
  verifyAccessToken
} from '../utils/_index'

const routes: MockMethod[] = [
  {
    method: 'get',
    response: (request: requestParams) => {
      const userinfo = verifyAccessToken(request)
      if (!userinfo) {
        return useResponseError('Unauthorized Exception')
      }

      return useResponseSuccess(userinfo)
    },
    url: prependPrefix('/user/info')
  }
]

export default routes
