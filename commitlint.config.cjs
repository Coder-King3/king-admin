/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */

const { readdirSync } = require('fs')
const { resolve } = require('path')

const scopes = readdirSync(resolve(process.cwd(), 'src'), {
  withFileTypes: true
})
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name.replace(/s$/, ''))

const rootScopes = ['internal', 'mock', 'types']

/** @type {import('cz-git').UserConfig} */
const userConfig = {
  extends: ['@commitlint/config-conventional'],
  ignores: [(commit) => commit.includes('init')],
  prompt: {
    allowBreakingChanges: ['feat', 'fix'],
    customScopesAlias: 'custom',
    customScopesAlign: 'bottom',
    emptyScopesAlias: 'empty',
    messages: {
      body: '填写更加详细的变更描述 (可选)。使用 "|" 换行 :\n',
      breaking: '列举非兼容性重大的变更 (可选)。使用 "|" 换行 :\n',
      confirmCommit: '是否提交或修改commit ?',
      customFooterPrefixs: '输入自定义issue前缀 :',
      customScope: '请输入自定义的提交范围 :',
      footer: '列举关联issue (可选) 例如: #31, #I3244 :\n',
      footerPrefixsSelect: '选择关联issue前缀 (可选):',
      scope: '选择一个提交范围 (可选):',
      subject: '填写简短精炼的变更描述 :\n',
      type: '选择你要提交的类型 :'
    },
    scopes: [...scopes, ...rootScopes],

    types: [
      { emoji: '🚀', name: 'feat:   🚀 新增功能', value: 'feat' },
      { emoji: '🧩', name: 'fix:   🧩 修复缺陷', value: 'fix' },
      { emoji: '📚', name: 'docs:   📚 文档变更', value: 'docs' },
      {
        emoji: '🎨',
        name: 'style:   🎨 代码格式',
        value: 'style'
      },
      {
        emoji: '♻️',
        name: 'refactor:   ♻️ 代码重构',
        value: 'refactor'
      },
      { emoji: '⚡️', name: 'perf:    ⚡️ 性能优化', value: 'perf' },
      {
        emoji: '✅',
        name: 'test:   ✅ 添加疏漏测试或已有测试改动',
        value: 'test'
      },
      {
        emoji: '📦️',
        name: '构建:   📦️ 构建流程、外部依赖变更 (如升级 npm 包、修改打包配置等)',
        value: 'build'
      },
      { emoji: '🎡', name: 'ci:   🎡 修改 CI 配置、脚本', value: 'ci' },
      { emoji: '⏪️', name: 'revert:   ⏪️ 回滚 commit', value: 'revert' },
      {
        emoji: '🔨',
        name: 'chore:   🔨 对构建过程或辅助工具和库的更改 (不影响源文件、测试用例)',
        value: 'chore'
      },
      { emoji: '🕔', name: 'wip:   🕔 正在开发中', value: 'wip' },
      { emoji: '📋', name: 'workflow:   📋 工作流程改进', value: 'workflow' },
      { emoji: '🔰', name: 'types:   🔰 类型定义文件修改', value: 'types' }
    ],
    useEmoji: true
  },
  rules: {
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 108],
    'subject-case': [0],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'perf',
        'style',
        'docs',
        'test',
        'refactor',
        'build',
        'ci',
        'chore',
        'revert',
        'types',
        'release'
      ]
    ]
  }
}

module.exports = userConfig
