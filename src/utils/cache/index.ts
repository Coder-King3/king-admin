import { StorageManager } from './storage-manager'

const localCache = new StorageManager({
  prefix: import.meta.env.VITE_APP_NAMESPACE,
  storageType: 'localStorage'
})

export { localCache }
