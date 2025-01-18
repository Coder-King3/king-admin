import crypto from 'crypto'

/* Request Params */
export interface requestParams {
  method: string
  body: any
  headers?: { authorization?: string }
  query: any
}

/* JsonWebToken */
export interface TokenPayload {
  [key: string]: any // 支持任意键值对
  exp?: number // 过期时间（可选，Unix 时间戳，秒）
}

interface TokenOptions {
  expiresIn: string // 例如 '7d' 或 '1h'
}

class SimpleJWT {
  /**
   * 创建 JWT
   */
  sign(
    payload: TokenPayload,
    secretKey: string,
    options: TokenOptions
  ): string {
    const header = this.encodeBase64({ alg: 'HS256', typ: 'JWT' })

    // 设置过期时间
    if (options.expiresIn) {
      payload.exp = this.calculateExpiry(options.expiresIn)
    }

    const payloadBase64 = this.encodeBase64(payload)
    const signature = this.generateSignature(
      `${header}.${payloadBase64}`,
      secretKey
    )

    return `${header}.${payloadBase64}.${signature}`
  }

  /**
   * 验证 JWT
   */
  verify(token: string, secretKey: string): TokenPayload | Error {
    const [headerBase64, payloadBase64, signature] = token.split('.')
    if (!headerBase64 || !payloadBase64 || !signature) {
      return new Error('Invalid token structure')
    }

    const expectedSignature = this.generateSignature(
      `${headerBase64}.${payloadBase64}`,
      secretKey
    )

    if (signature !== expectedSignature) {
      return new Error('Invalid signature')
    }

    const payload = this.decodeBase64(payloadBase64) as TokenPayload

    // 检查过期时间
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return new Error('Token expired')
    }

    return payload
  }

  /**
   * 计算过期时间戳
   */
  private calculateExpiry(expiresIn: string): number {
    const timeValue = parseInt(expiresIn, 10)
    const timeUnit = expiresIn.replace(/\d+/g, '').toLowerCase()

    const unitSecondsMap: Record<string, number> = {
      s: 1, // 秒
      m: 60, // 分钟
      h: 60 * 60, // 小时
      d: 24 * 60 * 60 // 天
    }

    const seconds = unitSecondsMap[timeUnit]
    if (!seconds) {
      throw new Error(`Unsupported time unit: ${timeUnit}`)
    }

    return Math.floor(Date.now() / 1000) + timeValue * seconds // 返回 Unix 时间戳
  }

  /**
   * Base64 编码
   */
  private encodeBase64(data: object): string {
    return Buffer.from(JSON.stringify(data))
      .toString('base64')
      .replace(/=+$/, '')
  }

  /**
   * Base64 解码
   */
  private decodeBase64(base64: string): object {
    return JSON.parse(Buffer.from(base64, 'base64').toString('utf-8'))
  }

  /**
   * 生成签名
   */
  private generateSignature(data: string, secretKey: string): string {
    return crypto
      .createHmac('sha256', secretKey)
      .update(data)
      .digest('base64')
      .replace(/=+$/, '')
  }
}

export const jwt = new SimpleJWT()

/* Prefix */
// 配置应与 env VITE_BASE_API_URL 一致
const prefix = '/dev-api'
export function prependPrefix(url: string): string {
  return prefix + url
}
