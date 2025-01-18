import type { Language } from 'element-plus/es/locale'

import type { ImportLocaleFn, SupportedLanguagesType } from './typing'

import { type App, ref, unref } from 'vue'
import { createI18n, type Locale } from 'vue-i18n'

import dayjs from 'dayjs'
import enLocale from 'element-plus/es/locale/lang/en'
import zhLocale from 'element-plus/es/locale/lang/zh-cn'

const elementLocale = ref<Language>(zhLocale)

const i18n = createI18n({
  // 是否为每个组件注入全局属性和函数（true 后 在template中可以直接使用$t('')）
  globalInjection: true,
  // 是否在vue应用程序上使用vue-i18n Legacy API（传统）模式
  legacy: false,
  locale: '',
  messages: {}
})

const modules = import.meta.glob('./langs/**/*.json')
const localesMap = loadLocalesMapFromDir(
  /\.\/langs\/([^/]+)\/(.*)\.json$/,
  modules
)

/**
 * 加载dayjs的语言包
 * @param lang
 */
async function loadDayjsLocale(lang: SupportedLanguagesType) {
  let locale
  switch (lang) {
    case 'en-US': {
      locale = await import('dayjs/locale/en')
      break
    }
    case 'zh-CN': {
      locale = await import('dayjs/locale/zh-cn')
      break
    }
    // 默认使用英语
    default: {
      locale = await import('dayjs/locale/en')
    }
  }
  if (locale) {
    dayjs.locale(locale)
  } else {
    console.error(`Failed to load dayjs locale for ${lang}`)
  }
}

/**
 * 加载element-plus的语言包
 * @param lang
 */
async function loadElementLocale(lang: SupportedLanguagesType) {
  switch (lang) {
    case 'en-US': {
      elementLocale.value = enLocale
      break
    }
    case 'zh-CN': {
      elementLocale.value = zhLocale
      break
    }
  }
}

/**
 * Load locale messages
 * @param lang
 */
async function loadLocaleMessages(lang: SupportedLanguagesType) {
  if (unref(i18n.global.locale) === lang) {
    return setI18nLanguage(lang)
  }

  const message = await localesMap[lang]?.()

  if (message?.default) {
    i18n.global.setLocaleMessage(lang, message.default)
  }

  const mergeMessage = await loadMessages(lang)
  i18n.global.mergeLocaleMessage(lang, mergeMessage)

  return setI18nLanguage(lang)
}

/**
 * Load locale modules with directory structure
 * @param regexp - Regular expression to match language and file names
 * @param modules - The modules object containing paths and import functions
 * @returns A map of locales to their corresponding import functions
 */
function loadLocalesMapFromDir(
  regexp: RegExp,
  modules: Record<string, () => Promise<unknown>>
): Record<Locale, ImportLocaleFn> {
  const localesRaw: Record<Locale, Record<string, () => Promise<unknown>>> = {}
  const localesMap: Record<Locale, ImportLocaleFn> = {}

  // Iterate over the modules to extract language and file names
  for (const path in modules) {
    const match = path.match(regexp)
    if (match) {
      const [_, locale, fileName] = match
      if (locale && fileName) {
        if (!localesRaw[locale]) {
          localesRaw[locale] = {}
        }
        if (modules[path]) {
          localesRaw[locale][fileName] = modules[path]
        }
      }
    }
  }

  // Convert raw locale data into async import functions
  for (const [locale, files] of Object.entries(localesRaw)) {
    localesMap[locale] = async () => {
      const messages: Record<string, any> = {}
      for (const [fileName, importFn] of Object.entries(files)) {
        messages[fileName] = ((await importFn()) as any)?.default
      }
      return { default: messages }
    }
  }

  return localesMap
}

/**
 * 加载应用特有的语言包
 * 这里也可以改造为从服务端获取翻译数据
 * @param lang
 */
async function loadMessages(lang: SupportedLanguagesType) {
  const [appLocaleMessages] = await Promise.all([
    localesMap[lang]?.(),
    loadThirdPartyMessage(lang)
  ])
  return appLocaleMessages?.default
}

/**
 * 加载第三方组件库的语言包
 * @param lang
 */
async function loadThirdPartyMessage(lang: SupportedLanguagesType) {
  await Promise.all([loadElementLocale(lang), loadDayjsLocale(lang)])
}

/**
 * Set i18n language
 * @param locale
 */
function setI18nLanguage(locale: Locale) {
  i18n.global.locale.value = locale

  document?.querySelector('html')?.setAttribute('lang', locale)
}

async function setupI18n(app: App) {
  const missingWarn = !import.meta.env.PROD
  const defaultLocale = 'zh-CN'

  app.use(i18n)
  await loadLocaleMessages(defaultLocale)

  // 在控制台打印警告
  i18n.global.setMissingHandler((locale, key) => {
    if (missingWarn && key.includes('.')) {
      console.warn(
        `[intlify] Not found '${key}' key in '${locale}' locale messages.`
      )
    }
  })
}

export { i18n, loadLocaleMessages, setupI18n }
