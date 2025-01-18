import type { MockMethod } from 'vite-plugin-mock'

import {
  generateAccessToken,
  MOCK_CODES,
  MOCK_USERS,
  prependPrefix,
  requestParams,
  useResponseError,
  useResponseSuccess,
  verifyAccessToken
} from '../utils/_index'

const routes: MockMethod[] = [
  {
    url: prependPrefix('/auth/login'),
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body
      if (!password || !username) {
        return useResponseError('Username and password are required')
      }

      const findUser = MOCK_USERS.find(
        (item) => item.username === username && item.password === password
      )

      if (!findUser) {
        return useResponseError('Username or password is incorrect.')
      }

      const accessToken = generateAccessToken(findUser)

      const { password: _pwd, ...userinfo } = findUser
      return useResponseSuccess({
        ...userinfo,
        accessToken
      })
    }
  },
  {
    url: prependPrefix('/auth/logout'),
    method: 'get',
    response: (request: requestParams) => {
      const verify = verifyAccessToken(request)
      if (!verify) return useResponseError('Invalid token')

      return useResponseError('Token has been destroyed')
    }
  },
  {
    url: prependPrefix('/auth/codes'),
    method: 'get',
    response: (request: requestParams) => {
      const userinfo = verifyAccessToken(request)
      if (!userinfo) {
        return useResponseError('Unauthorized Exception')
      }

      const codes =
        MOCK_CODES.find((item) => item.username === userinfo.username)?.codes ??
        []

      return useResponseSuccess(codes)
    }
  }
]

export default routes
