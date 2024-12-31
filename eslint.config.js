// @see: http://eslint.cn

import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import prettierRecommended from 'eslint-plugin-prettier/recommended'
import unocss from '@unocss/eslint-config/flat'

/** @type {import('eslint').Linter.Config[]} */
export default [
  // 指定文件匹配模式
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,vue}']
  },

  // 指定全局变量和环境
  {
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 'ESNext', // 使用最新的 ECMAScript 语法
      sourceType: 'module' // 代码是 ECMAScript 模块
    }
  },

  // 使用的扩展配置
  pluginJs.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  ...vueTsEslintConfig(),
  skipFormatting,
  prettierRecommended,
  unocss,

  // 自定义规则
  {
    rules: {
      // eslint (http://eslint.cn/docs/rules)
      'no-var': 'error', // 要求使用 let 或 const 而不是 var
      'no-multiple-empty-lines': ['error', { max: 1 }], // 不允许多个空行
      'prefer-const': 'off', // 使用 let 关键字声明但在初始分配后从未重新分配的变量，要求使用 const
      'no-use-before-define': 'off', // 禁止在 函数/类/变量 定义之前使用它们
      'no-undef': 'off', // 禁用未声明的变量
      'no-irregular-whitespace': 'off', // 禁止不规则的空白

      // typeScript (https://typescript-eslint.io/rules)
      '@typescript-eslint/no-require-imports': 'off', // 允许使用 require() 函数导入模块
      '@typescript-eslint/no-unused-expressions': 'off', // 禁止未使用的表达式
      '@typescript-eslint/no-unused-vars': 'error', // 禁止定义未使用的变量
      '@typescript-eslint/no-explicit-any': 'off', // 禁止使用 any 类型
      '@typescript-eslint/ban-types': 'off', // 禁止使用特定类型
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',

      // vue (https://eslint.vuejs.org/rules)
      'vue/script-setup-uses-vars': 'error', // 防止<script setup>使用的变量<template>被标记为未使用，此规则仅在启用该 no-unused-vars 规则时有效
      'vue/v-slot-style': 'error', // 强制执行 v-slot 指令样式
      'vue/no-mutating-props': 'error', // 不允许改变组件 prop
      'vue/custom-event-name-casing': 'error', // 为自定义事件名称强制使用特定大小写
      'vue/html-closing-bracket-newline': 'error', // 在标签的右括号之前要求或禁止换行
      'vue/attribute-hyphenation': 'error', // 对模板中的自定义组件强制执行属性命名样式：my-prop="prop"
      'vue/attributes-order': 'off', // vue api使用顺序，强制执行属性顺序
      'vue/no-v-html': 'off', // 禁止使用 v-html
      'vue/require-default-prop': 'off', // 此规则要求为每个 prop 为必填时，必须提供默认值
      'vue/multi-word-component-names': 'off', // 要求组件名称始终为 “-” 链接的单词
      'vue/no-setup-props-destructure': 'off' // 禁止解构 props 传递给 setup
    }
  },

  // 配置忽略项
  {
    ignores: [
      '**/*.sh',
      '**/node_modules/',
      '**/*.md',
      '**/*.woff',
      '**/*.ttf',
      '**/.vscode/',
      '**/.idea/**',
      '**/dist/**',
      '**/public/**',
      '**/docs/**',
      '**/.husky/',
      '**/.husky/**',
      '**/.local/**',
      '**/bin/**'
    ]
  }
]
