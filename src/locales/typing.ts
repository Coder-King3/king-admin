export type SupportedLanguagesType = 'en-US' | 'zh-CN'

export type ImportLocaleFn = () => Promise<{ default: Record<string, string> }>
