import type { ThemeModeType } from '@/types'

interface LayoutProps {
  /**
   * header高度
   * @default 50
   */
  headerHeight?: number
  /**
   * 顶栏是否隐藏
   * @default false
   */
  headerHidden?: boolean
  /**
   * 侧边栏是否隐藏
   * @default false
   */
  sidebarHidden?: boolean
  /**
   * 侧边栏
   * @default light
   */
  sidebarTheme?: ThemeModeType
  /**
   * 侧边栏宽度
   * @default 210
   */
  sidebarWidth?: number
  /**
   *  侧边菜单折叠宽度
   * @default 48
   */
  sideCollapseWidth?: number
}

export type { LayoutProps }
