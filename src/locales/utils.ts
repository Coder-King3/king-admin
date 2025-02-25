import type { ImportLocaleFn } from './types'

import type { Locale } from 'vue-i18n'

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

export { loadLocalesMapFromDir }
