import { i18n, loadLocaleMessages, setupI18n } from './i18n'

type TranslationType = typeof i18n.global.t
const translation: TranslationType = i18n.global.t

interface TranslationOptions {
  code?: boolean
  params?: any[]
}
type TranslationFn = (message: string, options?: TranslationOptions) => string

const $t: TranslationFn = (message, { code = false, params = [] } = {}) => {
  if (!code) return translation(message, params)

  const localMsg = new String(translation(message, params)) as any
  localMsg.code = message

  return localMsg
}

export { $t, i18n, loadLocaleMessages, setupI18n, translation }
export type { SupportedLanguagesType } from './types'
