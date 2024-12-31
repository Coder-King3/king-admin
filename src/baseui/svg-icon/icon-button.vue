<script setup lang="ts">
import { cn } from '@/utils'

defineOptions({ name: 'IconButton' })

interface Props {
  class?: any
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false
})

const buttonVariants = {
  default:
    'inline-flex items-center justify-center whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:cursor-not-allowed  disabled:opacity-50',
  size: 'h-8 w-8 rounded-sm text-sm px-1',
  variant:
    'dark:hover:text-$el-color-white hover:text-$el-color-black text-$el-text-color-primary'
  // variant:'hover:bg-accent'
}
</script>

<template>
  <button
    :class="
      cn(
        'cursor-pointer border-none bg-transparent',
        buttonVariants.default,
        buttonVariants.variant,
        buttonVariants.size,
        props.class
      )
    "
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>
