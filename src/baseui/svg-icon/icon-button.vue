<script setup lang="ts">
import { computed } from 'vue'

import { cn } from '@/utils'

defineOptions({ name: 'IconButton' })

type ButtonType = 'icon' | 'normal'

interface Props {
  class?: any
  disabled?: boolean
  type?: ButtonType
}
const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  type: 'normal',
  class: ''
})

const buttonTypeClass = computed(() =>
  props.type === 'icon' ? '' : 'hover:bg-accent'
)

const buttonVariants = {
  default:
    'inline-flex cursor-pointer items-center justify-center whitespace-nowrap disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-1',
  size: 'h-8 w-8 rounded-full px-1 text-sm',
  variant: 'border-none bg-transparent text-foreground/90 hover:text-foreground'
}
</script>

<template>
  <button
    :class="
      cn(
        buttonVariants.default,
        buttonVariants.variant,
        buttonVariants.size,
        buttonTypeClass,
        props.class
      )
    "
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>
