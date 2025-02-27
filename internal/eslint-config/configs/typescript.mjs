import { parserTs, pluginTs } from '../plugins.mjs'

export function typescript() {
  const files = ['**/*.?([cm])[jt]s?(x)']
  return [
    {
      files,
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
      name: 'king/typescript/setup',
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
        '@typescript-eslint/no-unsafe-function-type': 'off',
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
        'unused-imports/no-unused-vars': 'off'
      }
    }
  ]
}
