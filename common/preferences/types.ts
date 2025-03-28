import type { SupportedLanguagesType } from '@/locales'
import type {
  BreadcrumbStyleType,
  DeepPartial,
  LayoutHeaderModeType,
  LoginExpiredModeType,
  NavigationStyleType,
  TabsStyleType,
  ThemeModeType
} from '@types'

interface AppPreferences {
  /** 应用默认头像 */
  defaultAvatar: string
  /** 开启动态标题 */
  dynamicTitle: boolean
  /** 是否开启refreshToken */
  enableRefreshToken: boolean
  /** 是否移动端 */
  isMobile: boolean
  /** 支持的语言 */
  locale: SupportedLanguagesType
  /** 登录过期模式 */
  loginExpiredMode: LoginExpiredModeType
  /** 应用名 */
  name: string
}

interface BreadcrumbPreferences {
  /** 面包屑是否启用 */
  enable: boolean
  /** 面包屑是否只有一个时隐藏 */
  hideOnlyOne: boolean
  /** 面包屑首页图标是否可见 */
  showHome: boolean
  /** 面包屑图标是否可见 */
  showIcon: boolean
  /** 面包屑风格 */
  styleType: BreadcrumbStyleType
}

interface FooterPreferences {
  /** 底栏是否可见 */
  enable: boolean
  /** 底栏是否固定 */
  fixed: boolean
}

interface HeaderPreferences {
  /** 顶栏是否启用 */
  enable: boolean
  /** 顶栏是否隐藏,css-隐藏 */
  hidden: boolean
  /** header显示模式 */
  mode: LayoutHeaderModeType
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

interface TabbarPreferences {
  /** 是否开启多标签页拖拽 */
  draggable: boolean
  /** 是否开启多标签页 */
  enable: boolean
  /** 标签页高度 */
  height: number
  /** 开启标签页缓存功能 */
  keepAlive: boolean
  /** 是否持久化标签 */
  persist: boolean
  /** 是否开启多标签页图标 */
  showIcon: boolean
  /** 显示最大化按钮 */
  showMaximize: boolean
  /** 显示更多按钮 */
  showMore: boolean
  /** 标签页风格 */
  styleType: TabsStyleType
}

interface Preferences {
  /** 全局配置 */
  app: AppPreferences
  /** 面包屑配置 */
  breadcrumb: BreadcrumbPreferences
  /** 底栏配置 */
  footer: FooterPreferences
  /** 顶栏配置 */
  header: HeaderPreferences
  /** logo配置 */
  logo: LogoPreferences
  /** 导航配置 */
  navigation: NavigationPreferences
  /** 侧边栏配置 */
  sidebar: SidebarPreferences
  /** 标签栏配置 */
  tabbar: TabbarPreferences
  /** 主题配置 */
  theme: ThemePreferences
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
