import type { ClassType, Recordable } from '@/types'

import { isObject, isString } from './inference'

const joinTruthyKeys = (obj: Recordable) => {
  return Object.entries(obj)
    .filter(([_key, value]) => Boolean(value)) // 过滤值为假值的键
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

const cn = (...classNames: ClassType[]) => {
  return mergeClassNames(classNames)
}

export { createDefu as createMerge, defu as merge } from 'defu'
export { cn }
