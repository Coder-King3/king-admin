import { pluginPrettier } from '../plugins.mjs'

export function prettier() {
  return [
    {
      name: 'king/prettier/rules',
      plugins: {
        prettier: pluginPrettier
      },
      rules: {
        'prettier/prettier': 'error'
      }
    }
  ]
}
