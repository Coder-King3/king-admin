/**
 * 深层递归所有属性为可选
 */
type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T

/**
 * 深层递归所有属性为只读
 */
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P]
}

type Nullable<T> = null | T

type Recordable<T = any> = Record<string, T>

export type { DeepPartial, DeepReadonly, Nullable, Recordable }
