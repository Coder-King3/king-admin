import { pluginUnoCSS } from '../plugins.mjs'

export function unocss() {
  return [
    {
      name: 'king/unocss',
      plugins: {
        unocss: pluginUnoCSS
      },
      rules: {
        ...pluginUnoCSS.configs.flat.rules,
        'unocss/blocklist': 'error'
      }
    }
  ]
}
