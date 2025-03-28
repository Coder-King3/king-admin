<script setup lang="ts">
import type { MenuRecordRaw } from '@types'

import type { MenuProps } from './types'

import { computed } from 'vue'

import { Menu } from './components'
import SubMenuUi from './sub-menu-ui.vue'

defineOptions({ name: 'MenuView' })

interface Props extends MenuProps {
  menus: MenuRecordRaw[]
}

const props = defineProps<Props>()

const menus = computed(() => props.menus)

const menuProps = computed(() => ({
  accordion: props.accordion,
  collapse: props.collapse,
  collapseShowTitle: props.collapseShowTitle,
  defaultActive: props.defaultActive,
  mode: props.mode,
  rounded: props.rounded,
  theme: props.theme
}))
</script>

<template>
  <Menu v-bind="menuProps">
    <template v-for="menu in menus" :key="menu.path">
      <SubMenuUi :menu="menu" />
    </template>
  </Menu>
</template>
