import { defineConfig as defineUnoConfig } from 'unocss'

import { rulesConfig, shortcutsConfig, themeConfig } from './configs'
import { commonConfig } from './options'

function defineConfig() {
  const config = defineUnoConfig({
    // default config
    ...commonConfig,

    // configs
    ...rulesConfig,
    ...shortcutsConfig,
    ...themeConfig
  })

  return config
}
export { defineConfig }
