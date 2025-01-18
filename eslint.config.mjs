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

const defineConfig = (configs) => configs.flat()

function javascript() {
  return [
    {
      name: 'king/javascript/setup',
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

function typescript() {
  const files = ['**/*.?([cm])[jt]s?(x)']
  return [
    {
      files,
      name: 'king/typescript/setup',
      languageOptions: {
        parser: parserTs,
        parserOptions: {
          createDefaultProgram: false,
          ecmaFeatures: {
            jsx: true
          },
          ecmaVersion: 'latest',
          extraFileExtensions: ['.vue'],
          jsxPragma: 'React',
          project: './tsconfig.*.json',
          sourceType: 'module'
        }
      },
      plugins: {
        '@typescript-eslint': pluginTs
      }
    },
    {
      files,
      name: 'king/typescript/rules',
      rules: {
        ...pluginTs.configs['eslint-recommended'].overrides?.[0].rules,
        ...pluginTs.configs.strict.rules,
        '@typescript-eslint/ban-ts-comment': [
          'error',
          {
            'ts-check': false,
            'ts-expect-error': 'allow-with-description',
            'ts-ignore': 'allow-with-description',
            'ts-nocheck': 'allow-with-description'
          }
        ],

        '@typescript-eslint/consistent-type-definitions': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-empty-function': [
          'error',
          {
            allow: ['arrowFunctions', 'functions', 'methods']
          }
        ],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/no-non-null-assertion': 'error',
        '@typescript-eslint/no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_'
          }
        ],
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-var-requires': 'error',
        '@typescript-eslint/no-unsafe-function-type': 'off',
        'unused-imports/no-unused-vars': 'off'
      }
    }
  ]
}

function vue() {
  const files = ['**/*.vue']

  return [
    {
      files,
      languageOptions: {
        parser: parserVue,
        parserOptions: {
          ecmaFeatures: {
            jsx: true
          },
          extraFileExtensions: ['.vue'],
          parser: parserTs,
          sourceType: 'module'
        }
      },
      name: 'king/vue/setup',
      plugins: {
        vue: pluginVue
      }
    },
    {
      files,
      name: 'king/vue/rules',
      processor: pluginVue.processors['.vue'],
      rules: {
        ...pluginVue.configs.base.rules,
        ...pluginVue.configs['vue3-essential'].rules,
        ...pluginVue.configs['vue3-strongly-recommended'].rules,
        ...pluginVue.configs['vue3-recommended'].rules,

        'vue/attribute-hyphenation': [
          'error',
          'always',
          {
            ignore: []
          }
        ],
        'vue/attributes-order': 'off',
        'vue/block-order': [
          'error',
          {
            order: ['script', 'template', 'style']
          }
        ],
        'vue/component-name-in-template-casing': ['error', 'PascalCase'],
        'vue/component-options-name-casing': ['error', 'PascalCase'],
        'vue/custom-event-name-casing': ['error', 'camelCase'],

        'vue/dot-location': ['error', 'property'],
        'vue/dot-notation': ['error', { allowKeywords: true }],
        'vue/eqeqeq': ['error', 'smart'],
        'vue/html-closing-bracket-newline': 'error',
        'vue/html-indent': 'off',
        // 'vue/html-indent': ['error', 2],
        'vue/html-quotes': ['error', 'double'],
        'vue/html-self-closing': [
          'error',
          {
            html: {
              component: 'always',
              normal: 'never',
              void: 'always'
            },
            math: 'always',
            svg: 'always'
          }
        ],
        'vue/max-attributes-per-line': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/multiline-html-element-content-newline': 'error',
        'vue/no-empty-pattern': 'error',
        'vue/no-extra-parens': ['error', 'functions'],
        'vue/no-irregular-whitespace': 'error',
        'vue/no-loss-of-precision': 'error',
        'vue/no-reserved-component-names': 'off',
        'vue/no-restricted-syntax': [
          'error',
          'DebuggerStatement',
          'LabeledStatement',
          'WithStatement'
        ],
        'vue/no-restricted-v-bind': ['error', '/^v-/'],
        'vue/no-sparse-arrays': 'error',
        'vue/no-unused-refs': 'error',
        'vue/no-useless-v-bind': 'error',
        'vue/object-shorthand': [
          'error',
          'always',
          {
            avoidQuotes: true,
            ignoreConstructors: false
          }
        ],
        'vue/one-component-per-file': 'error',
        'vue/prefer-import-from-vue': 'error',
        'vue/prefer-separate-static-class': 'error',
        'vue/prefer-template': 'error',
        'vue/prop-name-casing': ['error', 'camelCase'],
        'vue/require-default-prop': 'error',
        'vue/require-explicit-emits': 'error',
        'vue/require-prop-types': 'off',
        'vue/script-setup-uses-vars': 'error',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/space-infix-ops': 'error',
        'vue/space-unary-ops': ['error', { nonwords: false, words: true }],
        'vue/v-on-event-hyphenation': [
          'error',
          'always',
          {
            autofix: true,
            ignore: []
          }
        ]
      }
    }
  ]
}

function imports() {
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

function perfectionist() {
  return [
    {
      name: 'king/perfectionist/setup',
      plugins: {
        perfectionist: pluginPerfectionist
      },
      settings: {
        perfectionist: {
          order: 'asc',
          type: 'natural'
        }
      }
    },
    {
      name: 'king/perfectionist/rules',
      rules: {
        'perfectionist/sort-exports': 'error',
        'perfectionist/sort-imports': [
          'error',
          {
            customGroups: {
              type: {
                src: 'src',
                vue: 'vue'
              },
              value: {
                src: ['^@/'],
                vue: ['vue', 'vue-*', '@vue*']
              }
            },
            groups: [
              ['external-type', 'builtin-type', 'type'],
              ['parent-type', 'sibling-type', 'index-type'],
              ['internal-type'],
              'builtin',
              'vue',
              'src',
              'external',
              'internal',
              ['parent', 'sibling', 'index'],
              'side-effect',
              'side-effect-style',
              'style',
              'object',
              'unknown'
            ],
            internalPattern: ['^@/.*'],
            newlinesBetween: 'always'
          }
        ],
        'perfectionist/sort-named-exports': 'error',
        'perfectionist/sort-named-imports': 'error'
      }
    }
  ]
}

function disableds() {
  const filesDts = ['**/*.d.ts']
  const filesJs = ['**/*.js', '**/*.mjs', '**/*.cjs']
  return [
    {
      files: filesDts,
      name: 'king/disableds/dts',
      rules: {
        '@typescript-eslint/triple-slash-reference': 'off',
        'import/no-duplicates': 'off',
        'no-restricted-syntax': 'off',
        'unused-imports/no-unused-vars': 'off'
      }
    },
    {
      files: filesJs,
      name: 'king/disableds/js',
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-require-imports': 'off'
      }
    }
  ]
}

function ignores() {
  return [
    {
      name: 'king/ignores',
      ignores: [
        '**/node_modules',
        '**/dist',
        '**/dist-*',
        '**/*-dist',
        '**/.husky',
        '**/.nitro',
        '**/.output',
        '**/Dockerfile',
        '**/package-lock.json',
        '**/yarn.lock',
        '**/pnpm-lock.yaml',
        '**/bun.lockb',
        '**/output',
        '**/coverage',
        '**/temp',
        '**/.temp',
        '**/tmp',
        '**/.tmp',
        '**/.history',
        '**/.turbo',
        '**/.nuxt',
        '**/.next',
        '**/.vercel',
        '**/.changeset',
        '**/.idea',
        '**/.cache',
        '**/.output',
        '**/.vite-inspect',

        '**/CHANGELOG*.md',
        '**/*.min.*',
        '**/LICENSE*',
        '**/__snapshots__',
        '**/*.snap',
        '**/fixtures/**',
        '**/.vitepress/cache/**',
        '**/auto-import?(s).d.ts',
        '**/components.d.ts',
        '**/vite.config.mts.*',
        '**/*.sh',
        '**/*.ttf',
        '**/*.woff'
      ]
    }
  ]
}

function prettier() {
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

function unocss() {
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

const config = defineConfig([
  javascript(),
  typescript(),
  vue(),
  imports(),
  perfectionist(),
  disableds(),
  ignores(),
  prettier(),
  unocss()
])

export default config
