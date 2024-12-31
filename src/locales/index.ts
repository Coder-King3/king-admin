import { i18n, loadLocaleMessages, setupI18n } from './i18n'

type TranslationType = typeof i18n.global.t
const $t: TranslationType = i18n.global.t

export { $t, i18n, loadLocaleMessages, setupI18n }
export { type SupportedLanguagesType } from './typing'
