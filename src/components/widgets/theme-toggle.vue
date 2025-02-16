<script setup lang="ts">
import { computed, nextTick, toRefs } from 'vue'

import { KingIcon, KingIconButton } from '@/baseui'
import { preferences, updatePreferences } from '@/preferences'

interface Props {
  /**
   * 类型
   */
  type?: 'icon' | 'normal'
}

defineOptions({ name: 'ThemeButton' })

const props = withDefaults(defineProps<Props>(), {
  type: 'normal'
})

const { type } = toRefs(props)

const isDark = computed({
  get() {
    return preferences.theme.mode === 'dark'
  },
  set(value) {
    updatePreferences({
      theme: { mode: value ? 'dark' : 'light' }
    })
  }
})

/* 切换暗黑模式逻辑 */
const toggleTheme = async (event: MouseEvent) => {
  const isAppearanceTransition =
    // @ts-expect-error
    document.startViewTransition &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!isAppearanceTransition || !event) {
    isDark.value = !isDark.value
    return
  }
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

  const transition = document.startViewTransition(async () => {
    isDark.value = !isDark.value
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
  <KingIconButton @click.stop="toggleTheme" :type="type">
    <Transition
      :name="isDark ? 'moon-fade-scale' : 'sun-fade-scale'"
      mode="out-in"
    >
      <template v-if="!isDark">
        <KingIcon icon="solar:moon-stars-bold" class="text-base" />
      </template>
      <template v-else>
        <KingIcon icon="solar:sun-2-bold" class="text-base" />
      </template>
    </Transition>
  </KingIconButton>
</template>

<style lang="scss" scoped>
// fade-scale
.moon-fade-scale-leave-active,
.moon-fade-scale-enter-active {
  transition: all 448ms;
}

.sun-fade-scale-leave-active,
.sun-fade-scale-enter-active {
  transition: all 268ms;
}

.moon-fade-scale-enter-from,
.sun-fade-scale-enter-from {
  opacity: 0;
  transform: scale(1.2);
}

.moon-fade-scale-leave-to,
.sun-fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
