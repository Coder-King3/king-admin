<script setup lang="ts">
import type { MenuProps } from './types'

import type { MenuRecordRaw } from '@/types'

import { Menu } from './components'
import SubMenu from './sub-menu.vue'

defineOptions({ name: 'MenuView' })

interface Props extends MenuProps {
  menus: MenuRecordRaw[]
}

const { menus, ...menuProps } = defineProps<Props>()
</script>

<template>
  <Menu v-bind="menuProps">
    <template v-for="menu in menus" :key="menu.path">
      <SubMenu :menu="menu" />
    </template>
  </Menu>
</template>
