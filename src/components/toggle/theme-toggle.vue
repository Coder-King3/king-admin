<script setup lang="ts">
import { nextTick } from 'vue'
import { useGlobalStore, storeToRefs } from '@/store'

defineOptions({ name: 'ThemeButton' })

const globalStore = useGlobalStore()
const { isDark } = storeToRefs(globalStore)
const { switchDark } = globalStore

/* 切换暗黑模式逻辑 */
const handleToggle = async (event: MouseEvent) => {
  const isAppearanceTransition = document.startViewTransition
  if (!isAppearanceTransition || !event) {
    switchDark()
    return
  }
  // 以event的x/y坐标为中心画圆
  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y)
  )
  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${endRadius}px at ${x}px ${y}px)`
  ]

  // 改变isDark状态后开启动画
  const transition = document.startViewTransition(async () => {
    switchDark()
    await nextTick()
  })
  await transition.ready

  document.documentElement.animate(
    {
      clipPath: isDark.value ? [...clipPath].reverse() : clipPath
    },
    {
      duration: 350,
      easing: 'ease-in',
      pseudoElement: isDark.value
        ? '::view-transition-old(root)'
        : '::view-transition-new(root)'
    }
  )
}
</script>

<template>
  <IconButton @click.st="(e: MouseEvent) => handleToggle(e)">
    <Transition :name="isDark ? 'moon-fade-scale' : 'fade-scale'" mode="out-in">
      <template v-if="!isDark">
        <SvgIcon icon="solar:moon-stars-bold" class="text-base"></SvgIcon>
      </template>
      <template v-else>
        <SvgIcon icon="solar:sun-2-bold" class="text-base"></SvgIcon>
      </template>
    </Transition>
  </IconButton>
</template>

<style lang="scss" scoped>
// moon-fade-scale
.moon-fade-scale-leave-active,
.moon-fade-scale-enter-active {
  transition: all 0.448s;
}
.moon-fade-scale-enter-from {
  opacity: 0;
  transform: scale(1.2);
}
.moon-fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
<style lang="scss">
/* view-transition */
::view-transition-new(root),
::view-transition-old(root) {
  @apply animate-none mix-blend-normal;
}
::view-transition-old(root) {
  @apply z-[1];
}
::view-transition-new(root) {
  @apply z-[9999];
}
.dark::view-transition-old(root) {
  @apply z-[9999];
}
.dark::view-transition-new(root) {
  @apply z-[1];
}
</style>
