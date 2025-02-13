<script setup lang="ts">
import type { MenuRecordRaw } from '@/types'

import { computed } from 'vue'

import { MenuItem, SubMenu as SubMenuComp } from './components'

interface Props {
  /**
   * 菜单项
   */
  menu: MenuRecordRaw
}

defineOptions({
  name: 'SubMenuUi'
})

const props = withDefaults(defineProps<Props>(), {})

/**
 * 判断是否有子节点，动态渲染 menu-item/sub-menu-item
 */
const hasChildren = computed(() => {
  const { menu } = props
  return (
    Reflect.has(menu, 'children') && !!menu.children && menu.children.length > 0
  )
})
</script>

<template>
  <MenuItem
    v-if="!hasChildren"
    :icon="menu.icon"
    :key="menu.path"
    :path="menu.path"
  >
    <template #title>
      <span>{{ menu.name }}</span>
    </template>
  </MenuItem>
  <SubMenuComp
    v-else
    :key="`${menu.path}_sub`"
    :index="`${menu.path}_sub`"
    :icon="menu.icon"
  >
    <template #title>
      <span>{{ menu.name }}</span>
    </template>
    <template v-for="childItem in menu.children || []" :key="childItem.path">
      <SubMenuUi :menu="childItem" />
    </template>
  </SubMenuComp>
</template>
