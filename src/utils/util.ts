import { isObject, isString } from './inference'

/**
 * Get assets static resources
 *
 * @param {string} name
 * @param {string} [suffix='png']
 * @param {string} [folder='images']
 */
export function getAssetsUrl(name: string, suffix = 'png', folder = 'images') {
  return new URL(`../assets/${folder}/${name}.${suffix}`, import.meta.url).href
}

export function mapArrayToObject<T extends Recordable>(
  lists: T[],
  key: keyof T,
  valueKey: keyof T
): Recordable {
  return lists.reduce<Recordable>((result, item) => {
    const objKey = item[key]
    if (typeof objKey !== 'string' || !objKey.trim()) return result

    result[objKey] = item[valueKey] ?? null
    return result
  }, {})
}

export function bindMethods<T extends object>(instance: T): void {
  const prototype = Object.getPrototypeOf(instance)
  const propertyNames = Object.getOwnPropertyNames(prototype)

  propertyNames.forEach((propertyName) => {
    const descriptor = Object.getOwnPropertyDescriptor(prototype, propertyName)
    const propertyValue = instance[propertyName as keyof T]

    if (
      typeof propertyValue === 'function' &&
      propertyName !== 'constructor' &&
      descriptor &&
      !descriptor.get &&
      !descriptor.set
    ) {
      instance[propertyName as keyof T] = propertyValue.bind(instance)
    }
  })
}

const joinTruthyKeys = (obj: Recordable) => {
  return Object.entries(obj)
    .filter(([_, value]) => Boolean(value)) // 过滤值为假值的键
    .map(([key]) => key) // 提取键
    .join(' ') // 用空格拼接
}

const removeDuplicates = (input: string): string => {
  return Array.from(new Set(input.split(' '))).join(' ')
}

const mergeClassNames = (classNames: ClassType[]) => {
  const resultNames: string = classNames
    .map((item) => {
      if (isString(item)) {
        return item
      } else if (Array.isArray(item)) {
        return mergeClassNames(item)
      } else if (isObject(item)) {
        return joinTruthyKeys(item)
      }
      return ''
    })
    .filter(Boolean)
    .join(' ')

  // 类名去重
  const filterNames = removeDuplicates(resultNames)
  return filterNames
}

export const cn = (...classNames: ClassType[]) => {
  return mergeClassNames(classNames)
}
