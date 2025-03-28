const isString = (val: unknown): val is string => typeof val === 'string'

const isEmpty = (val: unknown): boolean =>
  isString(val) ? val.trim() === '' : false

const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object'

export { isEmpty, isObject, isString }
