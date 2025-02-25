import type { UserConfig } from 'unocss'

const shortcutsConfig: UserConfig = {
  shortcuts: [
    ['absolute-center', 'absolute top-50% left-50% transform-translate--50%'],
    ['flex-between', 'flex justify-between items-center'],
    ['flex-center', 'flex items-center justify-center'],
    ['flex-col-center', 'flex flex-col items-center justify-center'],
    ['flex-start', 'flex justify-start items-center'],
    ['flex-end', 'flex justify-end items-center'],
    ['text-overflow', 'truncate']
  ]
}

export { shortcutsConfig }
