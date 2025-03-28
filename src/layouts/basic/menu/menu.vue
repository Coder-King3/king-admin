<script setup lang="ts">
import type { MenuRecordRaw } from '@types'

import { KingMenu, type MenuProps } from '@/components'

defineOptions({ name: 'LayoutMenu' })

interface Props extends MenuProps {
  menus: MenuRecordRaw[]
}
withDefaults(defineProps<Props>(), {
  menus: () => []
})
</script>

<template>
  <KingMenu
    :menus="menus"
    :theme="theme"
    :mode="mode"
    :default-active="defaultActive"
    :accordion="accordion"
    :collapse="collapse"
    :collapse-show-title="collapseShowTitle"
    :rounded="rounded"
  />
</template>
