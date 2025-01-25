import { StorageManager } from './storage-manager'

export * from './storage-manager'
export * from './types'

const localCache = new StorageManager({
  prefix: import.meta.env.VITE_APP_NAMESPACE,
  storageType: 'localStorage'
})

export { localCache }
