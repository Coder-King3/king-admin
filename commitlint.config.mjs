import { readdirSync } from 'fs'
import { resolve } from 'path'

const scopes = readdirSync(resolve(process.cwd(), 'src'), {
  withFileTypes: true
})
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name.replace(/s$/, ''))

/** @type {import('cz-git').UserConfig} */
const userConfig = {
  ignores: [(commit) => commit.includes('init')],
  extends: ['@commitlint/config-conventional'],
  prompt: {
    useEmoji: true,
    scopes: [...scopes],
    customScopesAlign: 'bottom',
    emptyScopesAlias: 'empty',
    customScopesAlias: 'custom',
    allowBreakingChanges: ['feat', 'fix'],

    messages: {
      type: '选择你要提交的类型 :',
      scope: '选择一个提交范围 (可选):',
      customScope: '请输入自定义的提交范围 :',
      subject: '填写简短精炼的变更描述 :\n',
      body: '填写更加详细的变更描述 (可选)。使用 "|" 换行 :\n',
      breaking: '列举非兼容性重大的变更 (可选)。使用 "|" 换行 :\n',
      footerPrefixsSelect: '选择关联issue前缀 (可选):',
      customFooterPrefixs: '输入自定义issue前缀 :',
      footer: '列举关联issue (可选) 例如: #31, #I3244 :\n',
      confirmCommit: '是否提交或修改commit ?'
    },
    types: [
      { value: 'feat', name: 'feat:   🚀 新增功能', emoji: '🚀' },
      { value: 'fix', name: 'fix:   🧩 修复缺陷', emoji: '🧩' },
      { value: 'docs', name: 'docs:   📚 文档变更', emoji: '📚' },
      {
        value: 'style',
        name: 'style:   🎨 代码格式',
        emoji: '🎨'
      },
      {
        value: 'refactor',
        name: 'refactor:   ♻️ 代码重构',
        emoji: '♻️'
      },
      { value: 'perf', name: 'perf:    ⚡️ 性能优化', emoji: '⚡️' },
      {
        value: 'test',
        name: 'test:   ✅ 添加疏漏测试或已有测试改动',
        emoji: '✅'
      },
      {
        value: 'build',
        name: '构建:   📦️ 构建流程、外部依赖变更 (如升级 npm 包、修改打包配置等)',
        emoji: '📦️'
      },
      { value: 'ci', name: 'ci:   🎡 修改 CI 配置、脚本', emoji: '🎡' },
      { value: 'revert', name: 'revert:   ⏪️ 回滚 commit', emoji: '⏪️' },
      {
        value: 'chore',
        name: 'chore:   🔨 对构建过程或辅助工具和库的更改 (不影响源文件、测试用例)',
        emoji: '🔨'
      },
      { value: 'wip', name: 'wip:   🕔 正在开发中', emoji: '🕔' },
      { value: 'workflow', name: 'workflow:   📋 工作流程改进', emoji: '📋' },
      { value: 'types', name: 'types:   🔰 类型定义文件修改', emoji: '🔰' }
    ]
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

export default userConfig
