/**
 * 应用名称
 */
const APP_NAME: string = import.meta.env.VITE_APP_NAME

/**
 * 项目版本
 */
const APP_VERSION: string = import.meta.env.VITE_APP_VERSION

/**
 * 命名空间
 */
const APP_NAMESPACE: string = import.meta.env.VITE_APP_NAMESPACE

interface LanguageOption {
  label: string
  value: 'en-US' | 'zh-CN'
}

/**
 * Supported languages
 */
const SUPPORT_LANGUAGES: LanguageOption[] = [
  {
    label: '简体中文',
    value: 'zh-CN'
  },
  {
    label: 'English',
    value: 'en-US'
  }
]

export {
  APP_NAME,
  APP_NAMESPACE,
  APP_VERSION,
  type LanguageOption,
  SUPPORT_LANGUAGES
}
