import type { ThemeModeType } from '@/types'

const THEME_MODE = [
  {
    mode: 'light',
    remove: 'dark'
  },
  {
    mode: 'dark',
    remove: 'light'
  }
]
const setThemeMode = (mode: ThemeModeType) => {
  const item = THEME_MODE.find((item) => item?.mode === mode)
  if (!item) return

  const ElementClassList = document.documentElement.classList
  ElementClassList.remove(item?.remove)
  ElementClassList.add(item?.mode)
}

export { setThemeMode }
