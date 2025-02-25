export type ImportLocaleFn = () => Promise<{ default: Record<string, string> }>

export type SupportedLanguagesType = 'en-US' | 'zh-CN'

export interface TranslationOptions {
  code?: boolean
  params?: any[]
}

export type TranslationFn = (
  message: string,
  options?: TranslationOptions
) => string
