<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed } from 'vue'

interface Props {
  /**
   * 高度
   */
  height?: number
}

const props = withDefaults(defineProps<Props>(), {
  height: 35
})

const style = computed((): CSSProperties => {
  const { height } = props
  return {
    height: `${height}px`
  }
})
</script>

<template>
  <ElContainer
    :style="style"
    class="w-full flex bg-background transition-all bb-1-$H:border"
  >
    <span>tabbar</span>
  </ElContainer>
</template>

<style lang="scss" scoped></style>
