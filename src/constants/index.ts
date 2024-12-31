/**
 * 应用名称
 */
export const APP_NAME: string = import.meta.env.VITE_APP_NAME

/**
 * 命名空间
 */
export const APP_NAMESPACE: string = import.meta.env.VITE_APP_NAMESPACE

/**
 * 登录页面 url 地址
 */
export const LOGIN_PATH = '/auth/login'

/**
 * 默认首页地址
 */
export const DEFAULT_HOME_PATH = '/workspace'

/**
 * 登录 token
 */
export const LOGIN_TOKEN = 'login-token'

export interface LanguageOption {
  label: string
  value: 'en-US' | 'zh-CN'
}

/**
 * Supported languages
 */
export const SUPPORT_LANGUAGES: LanguageOption[] = [
  {
    label: '简体中文',
    value: 'zh-CN'
  },
  {
    label: 'English',
    value: 'en-US'
  }
]
