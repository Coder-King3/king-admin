<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed } from 'vue'

interface Props {
  /**
   * 是否固定在底部
   */
  fixed?: boolean
  height: number
  /**
   * 是否显示
   * @default true
   */
  show?: boolean
  width: string
  zIndex: number
}

const props = withDefaults(defineProps<Props>(), {
  show: true
})

const style = computed((): CSSProperties => {
  const { fixed, height, show, width, zIndex } = props
  return {
    height: `${height}px`,
    marginBottom: show ? '0' : `-${height}px`,
    position: fixed ? 'fixed' : 'static',
    width,
    zIndex
  }
})
</script>

<template>
  <ElFooter
    :style="style"
    class="bottom-0 h-32px w-full bg-background-deep transition-all"
  >
    <slot></slot>
  </ElFooter>
</template>

<style lang="scss" scoped></style>
