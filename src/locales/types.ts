export type ImportLocaleFn = () => Promise<{ default: Record<string, string> }>

export type SupportedLanguagesType = 'en-US' | 'zh-CN'
