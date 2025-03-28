import { type EventHandlerRequest, getHeader, type H3Event } from 'h3'
import jwt from 'jsonwebtoken'

import { MOCK_USERS, type UserInfo } from './mock-data'

const ACCESS_TOKEN_SECRET = 'king-3_access'
const REFRESH_TOKEN_SECRET = 'king-3_refresh'

export interface UserPayload extends UserInfo {
  exp: number
  iat: number
}

export function generateAccessToken(user: UserInfo) {
  return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '7d' })
}

export function generateRefreshToken(user: UserInfo) {
  return jwt.sign(user, REFRESH_TOKEN_SECRET, {
    expiresIn: '30d'
  })
}

export function verifyAccessToken(
  event: H3Event<EventHandlerRequest>
): null | Omit<UserInfo, 'password'> {
  const authHeader = getHeader(event, 'Authorization')
  if (!authHeader?.startsWith('Bearer')) {
    return null
  }

  const token = authHeader.split(' ')[1] as string
  try {
    const decoded = jwt.verify(
      token,
      ACCESS_TOKEN_SECRET
    ) as unknown as UserPayload

    const username = decoded.username
    const finUser = MOCK_USERS.find((item) => item.username === username)

    if (!finUser) return null

    const { password: _pwd, ...userinfo } = finUser
    return userinfo
  } catch {
    return null
  }
}

export function verifyRefreshToken(
  token: string
): null | Omit<UserInfo, 'password'> {
  try {
    const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET) as UserPayload
    const username = decoded.username
    const user = MOCK_USERS.find(
      (item) => item.username === username
    ) as UserInfo
    const { password: _pwd, ...userinfo } = user
    return userinfo
  } catch {
    return null
  }
}
