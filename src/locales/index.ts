import type { TranslationFn } from './types'

import { i18n } from './i18n'

const translation: typeof i18n.global.t = i18n.global.t

const $t: TranslationFn = (message, { code = false, params = [] } = {}) => {
  if (!code) return translation(message, params)

  const localMsg = new String(translation(message, params)) as any
  localMsg.code = message

  return localMsg
}

export { $t, translation }

export * from './i18n'
export type { SupportedLanguagesType } from './types'
export * from './utils'
