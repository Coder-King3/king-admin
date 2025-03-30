/* eslint-disable perfectionist/sort-named-imports */

import { readBody, setResponseStatus } from 'h3'

import { createRoutes } from '../config'
import {
  // Part: cookie-utils
  clearRefreshTokenCookie,
  getRefreshTokenFromCookie,
  setRefreshTokenCookie,

  // Part: jwt-util
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,

  // Part: mock-data
  MOCK_CODES,
  MOCK_USERS,

  // Part: response
  forbiddenResponse,
  unAuthorizedResponse,
  useResponseError,
  useResponseSuccess
} from '../utils'

const routes = createRoutes()

routes.post('/login', async (event) => {
  const { password, username } = await readBody(event)
  if (!password || !username) {
    setResponseStatus(event, 400)
    return useResponseError(
      'BadRequestException',
      'Username and password are required'
    )
  }

  const findUser = MOCK_USERS.find(
    (item) => item.username === username && item.password === password
  )

  if (!findUser) {
    clearRefreshTokenCookie(event)
    return forbiddenResponse(event, 'Username or password is incorrect.')
  }

  const accessToken = generateAccessToken(findUser)
  const refreshToken = generateRefreshToken(findUser)

  setRefreshTokenCookie(event, refreshToken)

  return useResponseSuccess({
    ...findUser,
    accessToken
  })
})

routes.get('/logout', (event) => {
  const refreshToken = getRefreshTokenFromCookie(event)
  if (!refreshToken) {
    return useResponseSuccess('')
  }

  clearRefreshTokenCookie(event)

  return useResponseSuccess('')
})

routes.get('/codes', (event) => {
  const userinfo = verifyAccessToken(event)
  if (!userinfo) {
    return unAuthorizedResponse(event)
  }

  const codes =
    MOCK_CODES.find((item) => item.username === userinfo.username)?.codes ?? []

  return useResponseSuccess(codes)
})

routes.post('/refresh', (event) => {
  const refreshToken = getRefreshTokenFromCookie(event)
  if (!refreshToken) {
    return forbiddenResponse(event)
  }
  clearRefreshTokenCookie(event)

  const userinfo = verifyRefreshToken(refreshToken)
  if (!userinfo) {
    return forbiddenResponse(event)
  }

  const findUser = MOCK_USERS.find(
    (item) => item.username === userinfo.username
  )
  if (!findUser) {
    return forbiddenResponse(event)
  }
  const accessToken = generateAccessToken(findUser)

  setRefreshTokenCookie(event, refreshToken)

  return accessToken
})

export default routes.values
