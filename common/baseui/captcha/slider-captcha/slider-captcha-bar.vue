<script setup lang="ts">
import { computed, type CSSProperties, ref, useTemplateRef } from 'vue'

defineOptions({ name: 'SliderCaptchaBar' })

const props = defineProps<{
  barStyle: CSSProperties
  toLeft: boolean
}>()

const barRef = useTemplateRef<HTMLDivElement>('barRef')

const width = ref('0')

const style = computed(() => {
  const { barStyle } = props
  return {
    ...barStyle,
    width: width.value
  }
})

defineExpose({
  getEl: () => {
    return barRef.value
  },
  setWidth: (val: string) => {
    width.value = val
  }
})
</script>

<template>
  <div
    ref="barRef"
    class="absolute h-full bg-$el-color-success"
    :class="toLeft && 'transition-width !w-0 duration-300'"
    :style="style"
  ></div>
</template>
