export * from './date'
export * from './env'

export { default as colors } from 'chalk'
export { consola } from 'consola'

export { type PackageJson, readPackageJSON } from 'pkg-types'

function trackNthAccess(
  obj: Record<string, any>,
  prop: string,
  { callback, triggerCount }: { callback: Function; triggerCount: number }
) {
  let accessCount = 0

  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property === prop) {
        accessCount += 1

        if (accessCount === triggerCount) {
          const value = Reflect.get(target, property, receiver)
          callback(value)

          Object.defineProperty(target, property, {
            configurable: true,
            enumerable: true,
            value,
            writable: true
          })
        }
      }

      return Reflect.get(target, property, receiver)
    }
  })
}

export { trackNthAccess }
