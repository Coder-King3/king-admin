import type { SupportedLanguagesType } from '@/locales'
import type { DeepPartial, NavigationStyleType, ThemeModeType } from '@/types'

interface AppPreferences {
  /** 支持的语言 */
  locale: SupportedLanguagesType
  /** 应用默认头像 */
  defaultAvatar: string
  /** 开启动态标题 */
  dynamicTitle: boolean
  /** 是否移动端 */
  isMobile: boolean
  /** 应用名 */
  name: string
}

interface ThemePreferences {
  /** 当前主题 */
  mode: ThemeModeType
}

interface LogoPreferences {
  /** logo是否可见 */
  enable: boolean
  /** logo 地址 */
  source: string
}

interface NavigationPreferences {
  /** 导航菜单手风琴模式 */
  accordion: boolean
  /** 导航菜单风格 */
  styleType: NavigationStyleType
}

interface SidebarPreferences {
  /** 侧边栏是否折叠 */
  collapsed: boolean
  /** 侧边栏折叠时，是否显示title */
  collapsedShowTitle: boolean
  /** 侧边栏是否可见 */
  enable: boolean
  /** 菜单自动展开状态 */
  expandOnHover: boolean
  /** 侧边栏是否隐藏 - css */
  hidden: boolean
  /** 侧边栏宽度 */
  width: number
}

interface Preferences {
  /** 全局配置 */
  app: AppPreferences
  /** 主题配置 */
  theme: ThemePreferences
  /** logo配置 */
  logo: LogoPreferences
  /** 导航配置 */
  navigation: NavigationPreferences
  /** 侧边栏配置 */
  sidebar: SidebarPreferences
}

type PreferencesKeys = keyof Preferences

interface InitialOptions {
  namespace: string
  overrides?: DeepPartial<Preferences>
}

export type {
  AppPreferences,
  InitialOptions,
  Preferences,
  PreferencesKeys,
  ThemePreferences
}
