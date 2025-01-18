<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed, ref, useTemplateRef } from 'vue'

defineOptions({ name: 'SliderCaptchaAction' })

const props = defineProps<{
  actionStyle: CSSProperties
  isPassing: boolean
  toLeft: boolean
}>()

const actionRef = useTemplateRef<HTMLDivElement>('actionRef')

const left = ref('0')

const style = computed(() => {
  const { actionStyle } = props
  return {
    ...actionStyle,
    left: left.value
  }
})

const isDragging = computed(() => {
  const currentLeft = Number.parseInt(left.value as string)

  return currentLeft > 10 && !props.isPassing
})

defineExpose({
  getEl: () => {
    return actionRef.value
  },
  getStyle: () => {
    return actionRef?.value?.style
  },
  setLeft: (val: string) => {
    left.value = val
  }
})
</script>

<template>
  <div
    ref="actionRef"
    class="absolute left-0 top-0 h-full flex cursor-move items-center justify-center bg-$el-bg-color px-3.5 shadow-md dark:bg-accent"
    :class="{
      'transition-left !left-0 duration-300': toLeft,
      'rounded-md': isDragging
    }"
    :style="style"
    name="captcha-action"
  >
    <slot name="icon">
      <SvgIcon v-if="!isPassing" icon="lucide:chevrons-right" class="size-4" />
      <SvgIcon v-else icon="lucide:check" class="size-4" />
    </slot>
  </div>
</template>
