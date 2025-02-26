/* eslint-disable perfectionist/sort-objects */
import type { MockMethod } from 'vite-plugin-mock'

import type { requestParams } from '../utils'

import {
  prependPrefix,
  useResponseError,
  useResponseSuccess,
  verifyAccessToken
} from '../utils'

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
