import type { Component } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

/**
 * 扩展路由原始对象
 */
type ExRouteRecordRaw = {
  parent?: string
  parents?: string[]
  path?: any
} & RouteRecordRaw

/**
 * 菜单原始对象
 */
interface MenuRecordRaw {
  /**
   * 子菜单
   */
  children?: MenuRecordRaw[]
  /**
   * 是否禁用菜单
   * @default false
   */
  disabled?: boolean
  /**
   * 图标名
   */
  icon?: Component | string
  /**
   * 菜单名
   */
  name: string
  /**
   * 排序号
   */
  order?: number
  /**
   * 父级路径
   */
  parent?: string
  /**
   * 所有父级路径
   */
  parents?: string[]
  /**
   * 菜单路径，唯一，可当作key
   */
  path: string
  /**
   * 是否显示菜单
   * @default true
   */
  show?: boolean
}

export type { ExRouteRecordRaw, MenuRecordRaw }
