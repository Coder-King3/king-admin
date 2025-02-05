import type { SupportedLanguagesType } from '@/locales'
import type { DeepPartial, ThemeModeType } from '@/types'

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

interface Preferences {
  /** 全局配置 */
  app: AppPreferences
  /** 主题配置 */
  theme: ThemePreferences
  /** logo配置 */
  logo: LogoPreferences
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
