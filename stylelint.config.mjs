export default {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
  ignoreFiles: [
    '**/*.js',
    '**/*.jsx',
    '**/*.tsx',
    '**/*.ts',
    '**/*.json',
    '**/*.md'
  ],
  overrides: [
    {
      files: ['**/*.{html,vue}'],
      customSyntax: 'postcss-html',
      rules: {
        'selector-pseudo-class-no-unknown': [
          true,
          {
            ignorePseudoClasses: ['global', 'deep']
          }
        ],
        'selector-pseudo-element-no-unknown': [
          true,
          {
            ignorePseudoElements: ['v-deep', 'v-global', 'v-slotted']
          }
        ]
      }
    },
    {
      files: ['**/*.{scss,css}'],
      customSyntax: 'postcss-scss',
      extends: [
        'stylelint-config-recommended-scss',
        'stylelint-config-recommended-vue/scss'
      ]
    }
  ],
  plugins: [
    'stylelint-order',
    '@stylistic/stylelint-plugin',
    'stylelint-prettier',
    'stylelint-scss'
  ],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'extends',
          'ignores',
          'include',
          'mixin',
          'if',
          'else',
          'media',
          'for',
          'at-root',
          'unocss',
          'apply',
          'screen',
          'function',
          'each',
          'use',
          'forward',
          'return'
        ]
      }
    ],
    'at-rule-empty-line-before': null,
    'font-family-no-missing-generic-family-keyword': null,
    'function-no-unknown': null,
    'import-notation': null,
    'media-feature-range-notation': null,
    'named-grid-areas-no-invalid': null,
    'no-descending-specificity': null,
    'no-empty-source': null,
    'order/order': [
      [
        'dollar-variables',
        'custom-properties',
        'at-rules',
        'declarations',
        {
          name: 'supports',
          type: 'at-rule'
        },
        {
          name: 'media',
          type: 'at-rule'
        },
        {
          name: 'include',
          type: 'at-rule'
        },
        'rules'
      ],
      { severity: 'error' }
    ],
    'prettier/prettier': true,
    'rule-empty-line-before': [
      'always',
      {
        ignore: ['after-comment', 'first-nested']
      }
    ],
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'extends',
          'ignores',
          'include',
          'mixin',
          'if',
          'else',
          'media',
          'for',
          'at-root',
          'unocss',
          'apply',
          'screen',
          'function',
          'each',
          'use',
          'forward',
          'return'
        ]
      }
    ],
    'scss/operator-no-newline-after': null,
    'selector-class-pattern': null,
    'selector-not-notation': null
  }
}
