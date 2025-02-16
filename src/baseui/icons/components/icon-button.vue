<script setup lang="ts">
import type { Recordable } from '@/types'

import { cn } from '@/utils'

type ButtonType = 'icon' | 'normal'

interface Props {
  class?: any
  disabled?: boolean
  type?: ButtonType
}

defineOptions({ name: 'IconButton' })

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  type: 'normal',
  class: ''
})

const buttonVariants = (type: ButtonType) => {
  const variants = {
    default:
      'inline-flex cursor-pointer items-center justify-center whitespace-nowrap disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-1',
    size: 'h-8 w-8 rounded-full px-1 text-sm',
    variant:
      'border-none bg-transparent text-foreground/85 hover:text-foreground'
  }

  if (type === 'normal')
    variants.variant += ' hover:bg-accent transition-colors'

  const classNames = Object.keys(variants).reduce((names, key) => {
    return `${(names += (variants as Recordable<string>)[key])} `
  }, '')

  return classNames
}
</script>

<template>
  <button
    :class="cn('king-icon-button', buttonVariants(type), props.class)"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>
