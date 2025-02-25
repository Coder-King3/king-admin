/* eslint-disable perfectionist/sort-imports */

// base javascript
import globals from 'globals'
import eslintJs from '@eslint/js'
import pluginUnusedImports from 'eslint-plugin-unused-imports'

// typescript
import pluginTs from '@typescript-eslint/eslint-plugin'
import parserTs from '@typescript-eslint/parser'

// vue
import pluginVue from 'eslint-plugin-vue'
import parserVue from 'vue-eslint-parser'

// imports
import * as pluginImport from 'eslint-plugin-import-x'

// perfectionist
import pluginPerfectionist from 'eslint-plugin-perfectionist'

// prettier
import pluginPrettier from 'eslint-plugin-prettier'

// unocss
import pluginUnoCSS from '@unocss/eslint-plugin'

export {
  eslintJs,
  globals,
  parserTs,
  parserVue,
  pluginImport,
  pluginPerfectionist,
  pluginPrettier,
  pluginTs,
  pluginUnoCSS,
  pluginUnusedImports,
  pluginVue
}
