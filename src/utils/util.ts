import type { Recordable } from '@/types'

function bindMethods<T extends object>(instance: T): void {
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

/**
 * Get assets static resources
 *
 * @param {string} name
 * @param {string} [suffix='png']
 * @param {string} [folder='images']
 */
function getAssetsUrl(name: string, suffix = 'png', folder = 'images') {
  return new URL(`../assets/${folder}/${name}.${suffix}`, import.meta.url).href
}

function mapArrayToObject<T extends Recordable>(
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

export { bindMethods, getAssetsUrl, mapArrayToObject }
