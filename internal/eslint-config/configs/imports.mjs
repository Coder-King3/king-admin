import { pluginImport } from '../plugins.mjs'

export function imports() {
  return [
    {
      name: 'king/imports/rules',
      plugins: {
        import: pluginImport
      },
      rules: {
        'import/first': 'error',
        'import/newline-after-import': 'error',
        'import/no-duplicates': 'error',
        'import/no-mutable-exports': 'error',
        'import/no-named-default': 'error',
        'import/no-self-import': 'error',
        'import/no-unresolved': 'off',
        'import/no-webpack-loader-syntax': 'error'
      }
    }
  ]
}
