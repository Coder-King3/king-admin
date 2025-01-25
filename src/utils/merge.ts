import type { ClassType, Recordable } from '@/types'

import { isObject, isString } from './inference'

/**
 * 过滤 ClassNames 假值
 *
 * @param {Recordable} obj
 */
const filterTruthyKeys = (obj: Recordable) => {
  return Object.keys(obj).filter((key) => obj[key])
}

/**
 * 去除 ClassNames 重复项
 *
 * @param {string} input
 */
const removeDuplicates = (input: string): string => {
  return Array.from(new Set(input.split(/\s+/))).join(' ')
}

/**
 *  扁平化 ClassNames
 *
 * @param {ClassType[]} classNames
 */
const flattenClassNames = (classNames: ClassType[]) => {
  const resultNames: string = classNames
    .flatMap((item) => {
      if (Array.isArray(item)) return flattenClassNames(item)
      if (isString(item)) return item
      if (isObject(item)) return filterTruthyKeys(item)
      return ''
    })
    .filter(Boolean)
    .join(' ')

  return resultNames
}

/**
 * 合并 className
 *
 * @param {ClassType[]} classNames
 */
const cn = (...classNames: ClassType[]) => {
  return removeDuplicates(flattenClassNames(classNames))
}

export { createDefu as createMerge, defu as merge } from 'defu'
export { cn }
