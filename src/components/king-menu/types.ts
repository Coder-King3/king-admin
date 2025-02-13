/* eslint-disable @typescript-eslint/no-empty-object-type */
// import type { ElMenu } from 'element-plus'

import type { ThemeModeType } from '@/types'

import type {
  Component
  //  ExtractPropTypes
} from 'vue'

// 提取 ElMenu 的 props 类型
// type ElMenuProps = ExtractPropTypes<(typeof ElMenu)['props']>

interface MenuProps {
  /**
   * 是否开启手风琴模式
   * @default true
   */
  accordion?: boolean
  /**
   * 菜单是否折叠
   * @default false
   */
  collapse?: boolean

  /**
   * 菜单折叠时是否显示菜单名称
   */
  collapseShowTitle?: boolean

  /**
   * 默认激活的菜单
   */
  defaultActive?: string

  /**
   * 默认展开的菜单
   */
  // defaultOpeneds?: string[]

  /**
   * 菜单模式
   * @default vertical
   */
  mode?: 'vertical' | 'horizontal'

  /**
   * 是否圆润风格
   * @default true
   */
  rounded?: boolean

  /**
   * 菜单主题
   */
  theme?: ThemeModeType
}

// interface MenuItemProps {
//   /**
//    * 是否禁用
//    */
//   disabled?: boolean
//   /**
//    * 图标
//    */
//   icon?: Component | string
//   /**
//    * menuitem 路由
//    */
//   path?: string
// }

// interface SubMenuProps {
//   /**
//    * 是否禁用
//    */
//   disabled?: boolean
//   /**
//    * 图标
//    */
//   icon?: Component | string
//   /**
//    * menuitem 路由
//    */
//   path?: string
// }

interface BaseItemProps {
  /** 是否禁用 */
  disabled?: boolean
  /** 图标 */
  icon?: Component | string
  /** menuitem 路由 */
  path?: string
}

interface MenuItemProps extends BaseItemProps {}

interface SubMenuProps extends BaseItemProps {}

export type { MenuItemProps, MenuProps, SubMenuProps }
