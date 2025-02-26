import type { requestParams } from './_util'

import jwt from 'jsonwebtoken'

import { MOCK_USERS, type UserInfo } from './_mock-data'

const ACCESS_TOKEN_SECRET = 'king-3 <^_^> king-admin'

export interface UserPayload extends UserInfo {
  exp: number
  iat: number
}

export function generateAccessToken(user: UserInfo) {
  return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '7d' })
}

export function verifyAccessToken(
  request: requestParams
): null | Omit<UserInfo, 'password'> {
  const authHeader = request?.headers?.authorization
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
    const user = MOCK_USERS.find((item) => item.username === username)
    if (!user) return null

    const { password: _pwd, ...userinfo } = user
    return userinfo
  } catch {
    return null
  }
}
