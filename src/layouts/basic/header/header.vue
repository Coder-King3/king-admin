<!-- eslint-disable no-console -->
<script setup lang="ts">
import { computed } from 'vue'

import { KingIcon, KingIconButton } from '@/baseui'
import { LanguageToggle, LucideRotateCw, ThemeToggle } from '@/components'
import { preferences, updatePreferences } from '@/preferences'

defineOptions({ name: 'LayoutHeader' })

const refresh = () => {
  console.log('refresh')
}

const isShowTitle = computed(() => preferences.sidebar.collapsedShowTitle)
const collapsed = computed(() => preferences.sidebar.collapsed)
const test1 = () => {
  console.log('toggle collapsedShowTitle')
  updatePreferences({
    sidebar: {
      collapsedShowTitle: !isShowTitle.value
    }
  })
}

const isRounded = computed(() => preferences.navigation.styleType === 'rounded')

const test2 = () => {
  console.log('toggle collapsedShowTitle')
  updatePreferences({
    navigation: {
      styleType: isRounded.value ? 'plain' : 'rounded'
    }
  })
}
</script>

<template>
  <!-- 刷新按钮 -->
  <KingIconButton class="mr-1 rounded-md" @click="refresh">
    <LucideRotateCw class="size-4" />
  </KingIconButton>

  <!-- 面包屑 -->
  <div class="hidden flex-center lg:block">
    <slot name="breadcrumb"></slot>
  </div>

  <!-- placeholder -->
  <div class="placeholder h-full flex-1"></div>

  <!-- 小组件 -->
  <div class="h-full min-w-0 flex flex-shrink-0 items-center">
    <ThemeToggle class="mr-1" />
    <LanguageToggle class="mr-1" />
    <KingIconButton class="mr-1" :disabled="!collapsed">
      <KingIcon
        :icon="isShowTitle ? 'lucide:eye-off' : 'lucide:eye'"
        @click="test1"
      />
    </KingIconButton>
    <KingIconButton class="mr-3">
      <KingIcon
        :icon="isRounded ? 'lucide:square' : 'lucide:circle'"
        @click="test2"
      />
    </KingIconButton>
  </div>
</template>

<style lang="scss" scoped></style>
