import type { UserConfig } from 'unocss'

import presetAttributify from '@unocss/preset-attributify'
import presetTypography from '@unocss/preset-typography'
import presetUno from '@unocss/preset-uno'
import transformerDirectives from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'

const commonConfig: UserConfig = {
  // 预设
  presets: [
    // Unocss 默认预设 (wind)
    presetUno(),
    // class拆分属性预设
    presetAttributify(),
    // 排版预设
    presetTypography()
  ],
  // 转换器
  transformers: [
    /*
      @apply @screen theme()转换器
        @apply: flex;
        @screen xs { .grid { color: black } }
        .test{ background-color: theme('colors.blue.500'); }
    */
    transformerDirectives(),
    /*
      wind CSS的变体组功能
        sm:(mx-auto max-w-md w-full) text-(bold blue)
    */
    transformerVariantGroup()
  ]
}

export { commonConfig }
