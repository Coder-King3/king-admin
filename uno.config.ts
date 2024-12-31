// uno.config.ts
import presetUno from '@unocss/preset-uno'
import presetIcons from '@unocss/preset-icons'
import presetAttributify from '@unocss/preset-attributify'
import presetTypography from '@unocss/preset-typography'
import transformerDirectives from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import { defineConfig } from 'unocss'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

export default defineConfig({
  // 快捷方式(原子化类名)
  presets: [
    // 默认wind预设
    presetUno(),
    // 图标库预设
    presetIcons({
      prefix: 'icon-',
      scale: 1.2,
      extraProperties: {
        display: 'inline-block',
        overflow: 'hidden',
        'vertical-align': 'middle'
      },
      collections: {
        svg: FileSystemIconLoader('./src/assets/svg')
      }
    }),
    // class拆分属性预设
    presetAttributify(),
    // 排版预设
    presetTypography()
  ],
  transformers: [
    //  @apply @screen theme()转换器
    transformerDirectives(),
    // wind CSS的变体组功能
    transformerVariantGroup()
  ],
  shortcuts: [
    ['absolute-center', 'absolute top-50% left-50% transform-translate--50%'],
    ['flex-between', 'flex justify-between items-center'],
    ['flex-center', 'flex items-center justify-center'],
    ['flex-col-center', 'flex flex-col items-center justify-center'],
    ['flex-start', 'flex justify-start items-center'],
    ['flex-end', 'flex justify-end items-center'],
    ['text-overflow', 'truncate'],
    /*
      用于简化" sm: lg: dark: "等多类名写法
      class="sm>[left-0_top-0] dark>[bg-black_text-white]
      class="sm:left-0 sm:top-0 dark:bg-black dark:text-white"
    */
    [
      /^(.*)>\[(.*)\]$/,
      (match) => {
        if (!match) return ''

        const prefix = match[1]
        let values = match[2].split('_') // 将方括号内的内容按 "_" 分割
        let classes = values.map((value) => `${prefix}:${value}`).join(' ')

        return classes
      }
    ]
  ],
  // 自定义(动态)规则
  rules: [
    /* width & height */
    [
      /^wh-(\d+)(px)$/,
      (match) => ({
        width: `${match[1]}px`,
        height: `${match[1]}px`
      })
    ],
    /* Border */
    [
      /^b-(\d+)-(\$[a-zA-Z-_][\w-]*|rgba?$[\d\s.,%]+$|hsla?$[\d\s.,%]+$|#[0-9a-fA-F]{3,6}|[a-zA-Z]+)$/,
      (match) => {
        const size = match[1] // 边框宽度
        const color = match[2].startsWith('$')
          ? `var(--${match[2].slice(1)})` // 如果以 $ 开头，转为 CSS 变量
          : match[2] // 否则直接使用颜色值
        return { border: `solid ${size}px ${color}` }
      }
    ],
    [
      /^bt-(\d+)-(\$[a-zA-Z-_][\w-]*|rgba?$[\d\s.,%]+$|hsla?$[\d\s.,%]+$|#[0-9a-fA-F]{3,6}|[a-zA-Z]+)$/,
      (match) => {
        const size = match[1] // 边框宽度
        const color = match[2].startsWith('$')
          ? `var(--${match[2].slice(1)})` // 如果以 $ 开头，转为 CSS 变量
          : match[2] // 否则直接使用颜色值
        return { 'border-top': `solid ${size}px ${color}` }
      }
    ],
    [
      /^bb-(\d+)-(\$[a-zA-Z-_][\w-]*|rgba?$[\d\s.,%]+$|hsla?$[\d\s.,%]+$|#[0-9a-fA-F]{3,6}|[a-zA-Z]+)$/,
      (match) => {
        const size = match[1] // 边框宽度
        const color = match[2].startsWith('$')
          ? `var(--${match[2].slice(1)})` // 如果以 $ 开头，转为 CSS 变量
          : match[2] // 否则直接使用颜色值
        return { 'border-bottom': `solid ${size}px ${color}` }
      }
    ],
    [
      /^bl-(\d+)-(\$[a-zA-Z-_][\w-]*|rgba?$[\d\s.,%]+$|hsla?$[\d\s.,%]+$|#[0-9a-fA-F]{3,6}|[a-zA-Z]+)$/,
      (match) => {
        const size = match[1] // 边框宽度
        const color = match[2].startsWith('$')
          ? `var(--${match[2].slice(1)})` // 如果以 $ 开头，转为 CSS 变量
          : match[2] // 否则直接使用颜色值
        return { 'border-left': `solid ${size}px ${color}` }
      }
    ],
    [
      /^br-(\d+)-(\$[a-zA-Z-_][\w-]*|rgba?$[\d\s.,%]+$|hsla?$[\d\s.,%]+$|#[0-9a-fA-F]{3,6}|[a-zA-Z]+)$/,
      (match) => {
        const size = match[1] // 边框宽度
        const color = match[2].startsWith('$')
          ? `var(--${match[2].slice(1)})` // 如果以 $ 开头，转为 CSS 变量
          : match[2] // 否则直接使用颜色值
        return { 'border-right': `solid ${size}px ${color}` }
      }
    ]
  ]
})
