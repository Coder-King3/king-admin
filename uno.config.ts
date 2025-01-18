import presetAttributify from '@unocss/preset-attributify'
import presetIcons from '@unocss/preset-icons'
import presetTypography from '@unocss/preset-typography'
import presetUno from '@unocss/preset-uno'
import transformerDirectives from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import { defineConfig } from 'unocss'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

const uiColors = {
  // color
  background: {
    deep: 'hsl(var(--background-deep))',
    DEFAULT: 'hsl(var(--background))'
  },
  foreground: {
    DEFAULT: 'hsl(var(--foreground))'
  },
  secondary: {
    DEFAULT: 'hsl(var(--secondary))',
    foreground: 'hsl(var(--secondary-foreground))'
  },
  accent: {
    DEFAULT: 'hsl(var(--accent))',
    foreground: 'hsl(var(--accent-foreground))',
    hover: 'hsl(var(--accent-hover))',
    lighter: 'has(val(--accent-lighter))'
  },
  muted: {
    DEFAULT: 'hsl(var(--muted))',
    foreground: 'hsl(var(--muted-foreground))'
  },
  heavy: {
    DEFAULT: 'hsl(var(--heavy))',
    foreground: 'hsl(var(--heavy-foreground))'
  },
  ring: 'hsl(var(--ring))',
  // element
  header: {
    DEFAULT: 'hsl(var(--header))'
  },
  sidebar: {
    deep: 'hsl(var(--sidebar-deep))',
    DEFAULT: 'hsl(var(--sidebar))'
  },
  card: {
    DEFAULT: 'hsl(var(--card))',
    foreground: 'hsl(var(--card-foreground))'
  },
  border: {
    DEFAULT: 'hsl(var(--border))'
  }
}

const themeColors = {
  primary: {
    DEFAULT: 'hsl(var(--primary))'
  },
  success: {
    DEFAULT: 'hsl(var(--success))'
  },
  warning: {
    DEFAULT: 'hsl(var(--warning))'
  },
  destructive: {
    DEFAULT: 'hsl(var(--destructive))'
  },
  info: {
    DEFAULT: 'hsl(var(--info))'
  }
}

const colorPattern = `(?:\\$(H:)?[a-zA-Z-_][\\w-]*|rgba?\\([\\d\\s.,%]+\\)|hsla?\\([\\d\\s.,%]+\\)|#[0-9a-fA-F]{3,6}|[a-zA-Z]+)`
const borderRegex = new RegExp(`^(b|bt|bb|bl|br)-(\\d+)-(${colorPattern})$`)
const generateBorderStyle = (match: RegExpMatchArray, borderType: string) => {
  const size = match[2] // 边框宽度

  const colorStr = (cStr: string) => {
    const varStart = (prefix: string) => cStr.startsWith(prefix)

    if (varStart('$H:')) {
      return `hsl(var(--${cStr.slice(3)}))`
    } else if (varStart('$')) {
      return `var(--${cStr.slice(1)})`
    } else {
      return cStr
    }
  }
  const color = colorStr(match[3])

  const directionMap = {
    b: 'border',
    bt: 'border-top',
    bb: 'border-bottom',
    bl: 'border-left',
    br: 'border-right'
  }

  const borderProp = directionMap[borderType]
  const borderStyle = { [borderProp]: `${size}px solid ${color}` }
  return borderStyle
}

export default defineConfig({
  // 快捷方式
  shortcuts: [
    ['absolute-center', 'absolute top-50% left-50% transform-translate--50%'],
    ['flex-between', 'flex justify-between items-center'],
    ['flex-center', 'flex items-center justify-center'],
    ['flex-col-center', 'flex flex-col items-center justify-center'],
    ['flex-start', 'flex justify-start items-center'],
    ['flex-end', 'flex justify-end items-center'],
    ['text-overflow', 'truncate'],
    /* Custom Shortcuts */
    [
      'accent-hover',
      'dark:hover:text-$el-color-white hover:text-$el-color-black'
    ]
  ],
  // 主题
  theme: {
    borderRadius: {
      lg: 'var(--radius) /* 8px */',
      md: 'calc(var(--radius) - 2px) /* 6px */',
      sm: 'calc(var(--radius) - 4px) /* 4px */',
      xl: 'calc(var(--radius) + 4px) /* 12px */'
    },
    boxShadow: {
      float: `0 6px 16px 0 rgb(0 0 0 / 8%),
        0 3px 6px -4px rgb(0 0 0 / 12%),
        0 9px 28px 8px rgb(0 0 0 / 5%)`
    },
    colors: {
      ...uiColors,
      ...themeColors
    },
    fontFamily: {
      sans: [
        'var(--font-family)'
        //  theme('fontFamily.sans')
      ]
    }
  },
  // 规则
  rules: [
    /* Border */
    [borderRegex, (match) => generateBorderStyle(match, match[1])]
  ],
  // 预设
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
  // 转换器
  transformers: [
    /* @apply @screen theme()转换器 */
    // @apply: flex;
    // @screen xs { .grid { color: black } }
    // .test{ background-color: theme('colors.blue.500'); }
    transformerDirectives(),
    /* wind CSS的变体组功能 */
    // sm:(mx-auto max-w-md w-full) text-(bold blue)
    transformerVariantGroup()
  ]
})

// function createColorsPalette(name: string) {
//   // backgroundLightest: '#EFF6FF', // Uno CSS 默认的 `blue-50`
//   //         backgroundLighter: '#DBEAFE',  // Uno CSS 默认的 `blue-100`
//   //         backgroundLight: '#BFDBFE',    // Uno CSS 默认的 `blue-200`
//   //         borderLight: '#93C5FD',        // Uno CSS 默认的 `blue-300`
//   //         border: '#60A5FA',             // Uno CSS 默认的 `blue-400`
//   //         main: '#3B82F6',               // Uno CSS 默认的 `blue-500`
//   //         hover: '#2563EB',              // Uno CSS 默认的 `blue-600`
//   //         active: '#1D4ED8',             // Uno CSS 默认的 `blue-700`
//   //         backgroundDark: '#1E40AF',     // Uno CSS 默认的 `blue-800`
//   //         backgroundDarker: '#1E3A8A',   // Uno CSS 默认的 `blue-900`
//   //         backgroundDarkest: '#172554',  // Uno CSS 默认的 `blue-950`

//   // •	backgroundLightest (#EFF6FF): 适用于最浅的背景色，可能用于非常轻微的阴影或卡片的背景。
//   // •	backgroundLighter (#DBEAFE): 适用于略浅的背景色，通常用于次要背景或略浅的区域。
//   // •	backgroundLight (#BFDBFE): 适用于浅色背景，可能用于输入框或表单区域的背景。
//   // •	borderLight (#93C5FD): 适用于浅色边框，可能用于输入框或卡片的边框。
//   // •	border (#60A5FA): 适用于普通边框，可能用于按钮或卡片的边框。
//   // •	main (#3B82F6): 适用于主要的主题色，通常用于按钮、链接或主要的强调色。
//   // •	hover (#2563EB): 适用于鼠标悬停状态下的颜色，例如按钮悬停时的背景色或边框色。
//   // •	active (#1D4ED8): 适用于激活状态下的颜色，例如按钮按下时的背景色或边框色。
//   // •	backgroundDark (#1E40AF): 适用于深色背景，可能用于主要按钮或深色卡片背景。
//   // •	backgroundDarker (#1E3A8A): 适用于更深的背景，通常用于头部导航栏或页脚。
//   // •	backgroundDarkest (#172554): 适用于最深的背景，可能用于非常深色的区域或极端对比色。

//   return {
//     50: `hsl(var(--${name}-50))`,
//     100: `hsl(var(--${name}-100))`,
//     200: `hsl(var(--${name}-200))`,
//     300: `hsl(var(--${name}-300))`,
//     400: `hsl(var(--${name}-400))`,
//     500: `hsl(var(--${name}-500))`,
//     600: `hsl(var(--${name}-600))`,
//     700: `hsl(var(--${name}-700))`,
//     // 800: `hsl(var(--${name}-800))`,
//     // 900: `hsl(var(--${name}-900))`,
//     // 950: `hsl(var(--${name}-950))`,
//     // 激活状态下的颜色，适用于按钮按下时的背景色或边框色。
//     active: `hsl(var(--${name}-700))`,
//     // 浅色背景，适用于输入框或表单区域的背景。
//     'background-light': `hsl(var(--${name}-200))`,
//     // 适用于略浅的背景色，通常用于次要背景或略浅的区域。
//     'background-lighter': `hsl(var(--${name}-100))`,
//     // 最浅的背景色，适用于非常轻微的阴影或卡片的背景。
//     'background-lightest': `hsl(var(--${name}-50))`,
//     // 适用于普通边框，可能用于按钮或卡片的边框。
//     border: `hsl(var(--${name}-400))`,
//     // 浅色边框，适用于输入框或卡片的边框。
//     'border-light': `hsl(var(--${name}-300))`,
//     foreground: `hsl(var(--${name}-foreground))`,
//     // 鼠标悬停状态下的颜色，适用于按钮悬停时的背景色或边框色。
//     hover: `hsl(var(--${name}-600))`,
//     // 主色文本
//     text: `hsl(var(--${name}-500))`,
//     // 主色文本激活态
//     'text-active': `hsl(var(--${name}-700))`,
//     // 主色文本悬浮态
//     'text-hover': `hsl(var(--${name}-600))`
//   }
// }
