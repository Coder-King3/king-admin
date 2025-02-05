/**
 * @description 检查传入的字符串是否为有效的HTTP或HTTPS URL。
 * @param {string} url 要检查的字符串。
 * @return {boolean} 如果字符串是有效的HTTP或HTTPS URL，返回true，否则返回false。
 */
const isHttpUrl = (url?: string): boolean => {
  if (!url) {
    return false
  }
  // 使用正则表达式测试URL是否以http:// 或 https:// 开头
  const httpRegex = /^https?:\/\/.*$/
  return httpRegex.test(url)
}

const isFunction = (val: unknown): val is Function => typeof val === 'function'

const isString = (val: unknown): val is string => typeof val === 'string'

const isEmpty = (val: unknown): boolean =>
  isString(val) ? val.trim() === '' : false

const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object'

const isJsonString = (val: unknown) => {
  try {
    return isObject(JSON.parse(val as string))
  } catch {
    return false
  }
}

export { isEmpty, isFunction, isHttpUrl, isJsonString, isObject, isString }
