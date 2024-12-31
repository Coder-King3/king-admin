import { verifyToken } from './_jwt'
import { resultError } from './_result'

export * from './_jwt'
export * from './_result'

export interface requestParams {
  method: string
  body: any
  headers?: { authorization?: string }
  query: any
}

/**
 * @description getRequestToken 用于从request数据中获取token，请根据项目的实际情况修改
 *
 */
export function getRequestToken({
  headers
}: requestParams): string | undefined {
  return headers?.authorization
}

export function accessVerify(request: requestParams): {
  isValid: boolean
  result: any
} {
  let token = getRequestToken(request)
  if (token?.includes('Bearer ')) token = token.split('Bearer ')[1]
  if (!token || !verifyToken(token))
    return { isValid: false, result: resultError('Invalid token') }

  return { isValid: true, result: null }
}

const prefix = '/dev-api'
export function getPrefixURL(url: string): string {
  return prefix + url
}

// const token = getRequestToken(request);
//       if (!token) {
//         return resultError('Invalid token!');
//       }
