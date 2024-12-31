import { isJsonString, isObject } from './inference'

enum CacheType {
  Local,
  Session
}

/**
 * StorageCache Class Implemented Based on the Storage API
 * @class StorageCache
 * @private storage
 */
class StorageCache {
  private storage: Storage

  /**
   * Creates an instance of StorageCache.
   *
   * @param {CacheType} type
   * @memberof StorageCache
   */
  constructor(type: CacheType) {
    this.storage = type === CacheType.Local ? localStorage : sessionStorage
  }

  /**
   * Retrieve the cached data based on the provided key
   *
   * @param {string} key
   * @return {*}
   */
  getCache(key: string) {
    const value: any = this.storage.getItem(key)

    if (!value) return null

    return isJsonString(value) ? JSON.parse(value) : value
  }

  /**
   * Set the cached data based on the provided key and value
   *
   * @param {string} key
   * @param {any} value
   */
  setCache(key: string, value: any) {
    const cacheValue = isObject(value) ? JSON.stringify(value) : value

    this.storage.setItem(key, cacheValue)
  }

  /**
   * Update the cached object based on the provided key, property, and value
   *
   * @param {string} key
   * @param {string} property
   * @param {any} value
   */
  updateCache(key: string, property: string, value: any) {
    const cache: { [key: string]: any } = this.getCache(key)
    if (!isObject(cache)) return

    cache[property] = value
    this.setCache(key, cache)
  }

  /**
   * Delete the cached data based on the provided key
   *
   * @param {string} key
   */
  deleteCache(key: string) {
    this.storage.removeItem(key)
  }

  /**
   * Check if the cached data exists based on the provided key
   *
   * @param {string} key
   * @return {*}  {boolean}
   */
  hasCache(key: string): boolean {
    const isHas = !!this.getCache(key)
    return isHas
  }

  /**
   * Clear all cached data
   */
  clearCache() {
    this.storage.clear()
  }
}

export const localCache = new StorageCache(CacheType.Local)
export const sessionCache = new StorageCache(CacheType.Session)
