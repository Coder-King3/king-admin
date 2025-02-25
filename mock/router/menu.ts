import type { MockMethod } from 'vite-plugin-mock'

import {
  MOCK_MENUS,
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

      const menus =
        MOCK_MENUS.find((item) => item.username === userinfo.username)?.menus ??
        []

      return useResponseSuccess(menus)
    },
    url: prependPrefix('/menu/all')
  }
]

export default routes
