<script setup lang="ts">
import type { MenuItemProps } from '../types'

import { computed, toRefs } from 'vue'
import { useRouter } from 'vue-router'

import { MenuItem } from '@/baseui/ep'

import MenuContent from './menu-content.vue'

interface Props extends MenuItemProps {}

defineOptions({ name: 'MenuItem' })

const props = withDefaults(defineProps<Props>(), {
  disabled: false
})

const { disabled, path } = toRefs(props)

const router = useRouter()

const indexKey = computed(() => `${path.value}`)

const handleTo = (path: string = '/404') => {
  router.push(path)
}
</script>

<template>
  <MenuItem
    class="king-menu-item"
    :index="indexKey"
    :disabled="disabled"
    :route="path"
    @click="handleTo(path)"
  >
    <MenuContent :icon="icon">
      <template #title>
        <slot name="title"></slot>
      </template>
    </MenuContent>
  </MenuItem>
</template>
