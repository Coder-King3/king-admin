import { eslintJs, globals, pluginUnusedImports } from '../plugins.mjs'

export function javascript() {
  return [
    {
      languageOptions: {
        ecmaVersion: 'latest',
        globals: {
          ...globals.browser,
          ...globals.es2021,
          ...globals.node
        },
        parserOptions: {
          ecmaFeatures: {
            jsx: true
          },
          ecmaVersion: 'latest',
          sourceType: 'module'
        },
        sourceType: 'module'
      },
      linterOptions: {
        reportUnusedDisableDirectives: true
      },
      name: 'king/javascript/setup',
      plugins: {
        'unused-imports': pluginUnusedImports // 用于检测和自动移除未使用的导入和变量
      }
    },
    {
      name: 'king/javascript/rules',
      rules: {
        ...eslintJs.configs.recommended.rules,
        'accessor-pairs': [
          'error',
          { enforceForClassMembers: true, setWithoutGet: true }
        ],
        'array-callback-return': 'error',
        'block-scoped-var': 'error',
        'constructor-super': 'error',
        'default-case-last': 'error',
        'dot-notation': 'warn',
        eqeqeq: ['error', 'always'],
        'no-alert': 'warn',
        'no-console': ['warn', { allow: ['warn', 'error', 'info', 'clear'] }],
        'no-debugger': 'warn',
        'no-empty': ['error', { allowEmptyCatch: true }],
        'no-fallthrough': [
          'warn',
          { commentPattern: String.raw`break[\s\w]*omitted` }
        ],
        'no-inner-declarations': 'error',
        'no-restricted-syntax': [
          'error',
          'DebuggerStatement',
          'LabeledStatement',
          'WithStatement',
          'TSEnumDeclaration[const=true]',
          'TSExportAssignment'
        ],
        'no-unused-expressions': [
          'error',
          {
            allowShortCircuit: true,
            allowTaggedTemplates: true,
            allowTernary: true
          }
        ],
        'no-unused-vars': [
          'error',
          {
            args: 'none',
            caughtErrors: 'none',
            ignoreRestSiblings: true,
            vars: 'all'
          }
        ],
        'no-use-before-define': [
          'error',
          { classes: false, functions: false, variables: true }
        ],
        'no-var': 'error',
        'object-shorthand': [
          'error',
          'always',
          { avoidQuotes: true, ignoreConstructors: false }
        ],
        'prefer-arrow-callback': [
          'error',
          {
            allowNamedFunctions: false,
            allowUnboundThis: true
          }
        ],
        'prefer-const': [
          'warn',
          {
            destructuring: 'all',
            ignoreReadBeforeAssign: true
          }
        ],
        'prefer-exponentiation-operator': 'error',
        'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
        'prefer-rest-params': 'error',
        'prefer-spread': 'error',
        'prefer-template': 'error',
        'unicode-bom': ['error', 'never'],
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
          'error',
          {
            args: 'after-used',
            argsIgnorePattern: '^_',
            vars: 'all',
            varsIgnorePattern: '^_'
          }
        ],
        'use-isnan': [
          'error',
          { enforceForIndexOf: true, enforceForSwitchCase: true }
        ],
        'valid-typeof': ['error', { requireStringLiterals: true }],
        'vars-on-top': 'error'
      }
    }
  ]
}
