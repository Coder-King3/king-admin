<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import type { CSSProperties } from 'vue'
import { SpineText } from '@/baseui'

defineOptions({ name: 'SliderCaptchaContent' })

const props = defineProps<{
  contentStyle: CSSProperties
  isPassing: boolean
  successText: string
  text: string
}>()

const contentRef = useTemplateRef<HTMLDivElement>('contentRef')

const style = computed(() => {
  const { contentStyle } = props

  return {
    ...contentStyle
  }
})

defineExpose({
  getEl: () => {
    return contentRef.value
  }
})
</script>

<template>
  <div
    ref="contentRef"
    class="absolute top-0 flex size-full select-none items-center justify-center text-xs"
    :class="{
      [$style.success]: isPassing
    }"
    :style="style"
  >
    <slot name="text">
      <SpineText class="flex h-full items-center">
        {{ isPassing ? successText : text }}
      </SpineText>
    </slot>
  </div>
</template>

<style module>
.success {
  -webkit-text-fill-color: hsl(0deg 0% 98%);
}
</style>
