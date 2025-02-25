import { pluginPerfectionist } from '../plugins.mjs'

export function perfectionist() {
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
        'perfectionist/sort-classes': 'error',
        'perfectionist/sort-exports': 'error',
        'perfectionist/sort-imports': [
          'error',
          {
            customGroups: {
              type: {
                root: 'root',
                src: 'src',
                vue: 'vue'
              },
              value: {
                root: ['^~/'],
                src: ['^@/'],
                vue: ['^vue', '^vue-*', '^@vue*']
              }
            },
            groups: [
              ['external-type', 'builtin-type', 'type'],
              ['parent-type', 'sibling-type', 'index-type'],
              ['internal-type'],
              'builtin',
              'vue',
              'root',
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
            internalPattern: ['^~/.*'],
            newlinesBetween: 'always'
            // order: 'asc',
            // type: 'natural',
          }
        ],
        'perfectionist/sort-interfaces': 'error',
        'perfectionist/sort-named-exports': 'error',
        'perfectionist/sort-named-imports': 'error',
        'perfectionist/sort-object-types': 'error',
        'perfectionist/sort-objects': [
          'error',
          {
            customGroups: {
              items: 'items',
              list: 'list',
              children: 'children'
            },
            groups: ['unknown', 'items', 'list', 'children'],
            ignorePattern: ['children'],
            partitionByComment: ['^Part:.*$']
          }
        ],
        'perfectionist/sort-union-types': 'error'
      }
    }
  ]
}
