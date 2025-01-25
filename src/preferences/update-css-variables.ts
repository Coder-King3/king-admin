import type { Preferences } from './types'

/**
 * 更新主题的 CSS 变量以及其他 CSS 变量
 * @param preferences - 当前偏好设置对象，它的主题值将被用来设置文档的主题。
 */
function updateCSSVariables(preferences: Preferences) {
  // 当修改到颜色变量时，更新 css 变量
  const root = document.documentElement
  if (!root) {
    return
  }

  const theme = preferences?.theme ?? {}

  const { mode } = theme

  // html 设置 dark 类
  if (Reflect.has(theme, 'mode')) {
    const dark = isDarkTheme(mode)
    root.classList.toggle('dark', dark)
  }
}

function isDarkTheme(theme: string) {
  let dark = theme === 'dark'
  if (theme === 'auto') {
    dark = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  return dark
}

export { isDarkTheme, updateCSSVariables }
