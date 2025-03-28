import { computed } from 'vue'

import { preferencesManager } from './preferences'
import { isDarkTheme } from './update-css-variables'

function usePreferences() {
  const preferences = preferencesManager.getPreferences()
  const initialPreferences = preferencesManager.getInitialPreferences()

  const appPreferences = computed(() => preferences.app)

  const isDark = computed(() => {
    return isDarkTheme(preferences.theme.mode)
  })

  const locale = computed(() => {
    return preferences.app.locale
  })

  const isMobile = computed(() => {
    return appPreferences.value.isMobile
  })

  const theme = computed(() => {
    return isDark.value ? 'dark' : 'light'
  })

  return {
    appPreferences,
    initialPreferences,
    isDark,
    isMobile,
    locale,
    preferences,
    theme
  }
}

export { usePreferences }
