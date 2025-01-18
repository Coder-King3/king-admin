type Nullable<T> = null | T

type Recordable<T = any> = Record<string, T>

export type { Nullable, Recordable }
