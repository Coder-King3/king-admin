import type { MockMethod } from 'vite-plugin-mock'

import {
  MOCK_MENUS,
  prependPrefix,
  requestParams,
  useResponseError,
  useResponseSuccess,
  verifyAccessToken
} from '../utils/_index'

const routes: MockMethod[] = [
  {
    url: prependPrefix('/menu/all'),
    method: 'get',
    response: (request: requestParams) => {
      const userinfo = verifyAccessToken(request)
      if (!userinfo) {
        return useResponseError('Unauthorized Exception')
      }

      const menus =
        MOCK_MENUS.find((item) => item.username === userinfo.username)?.menus ??
        []

      return useResponseSuccess(menus)
    }
  }
]

export default routes
