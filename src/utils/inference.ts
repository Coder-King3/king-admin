/**
 * @description 检查传入的字符串是否为有效的HTTP或HTTPS URL。
 * @param {string} url 要检查的字符串。
 * @return {boolean} 如果字符串是有效的HTTP或HTTPS URL，返回true，否则返回false。
 */
export const isHttpUrl = (url?: string): boolean => {
  if (!url) {
    return false
  }
  // 使用正则表达式测试URL是否以http:// 或 https:// 开头
  const httpRegex = /^https?:\/\/.*$/
  return httpRegex.test(url)
}

export const isFunction = (val: unknown): val is Function =>
  typeof val === 'function'

export const isString = (val: unknown): val is string => typeof val === 'string'

export const isEmpty = (val: unknown): boolean =>
  val && isString(val) ? val.trim() !== '' : false

export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object'

export const isJsonString = (val: unknown) => {
  try {
    return isObject(JSON.parse(val as string))
  } catch {
    return false
  }
}
