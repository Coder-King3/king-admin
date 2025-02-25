<script setup lang="ts">
import type { SubMenuProps } from '../types'

import { computed } from 'vue'

import { LucideChevronDown } from '@/components'

interface Props extends SubMenuProps {}

defineOptions({
  name: 'SubMenu'
})

const props = defineProps<Props>()

const indexKey = computed(() => `${props.path}`)
</script>

<template>
  <ElSubMenu
    class="king-sub-menu"
    :index="indexKey"
    :expand-open-icon="LucideChevronDown"
    :expand-close-icon="LucideChevronDown"
  >
    <template #title>
      <MenuContent :icon="icon">
        <template #title>
          <slot name="title"></slot>
        </template>
      </MenuContent>
    </template>

    <!-- 默认插槽 -->
    <slot></slot>
  </ElSubMenu>
</template>
