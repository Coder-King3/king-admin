export interface StorageItem<T> {
  expiry?: number
  value: T
}

export interface StorageManagerOptions {
  prefix?: string
  storageType?: StorageType
}

type StorageType = 'localStorage' | 'sessionStorage'
