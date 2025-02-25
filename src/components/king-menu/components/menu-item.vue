<script setup lang="ts">
import type { MenuItemProps } from '../types'

import { computed, toRefs } from 'vue'
import { useRouter } from 'vue-router'

import MenuContent from './menu-content.vue'

interface Props extends MenuItemProps {}

defineOptions({ name: 'MenuItem' })

const props = withDefaults(defineProps<Props>(), {
  disabled: false
})

const { disabled, path } = toRefs(props)

const router = useRouter()

const indexKey = computed(() => `${path.value}`)

const handleToPage = (path: string = '/404') => {
  router.push(path)
}
</script>

<template>
  <ElMenuItem
    class="king-menu-item"
    :index="indexKey"
    :disabled="disabled"
    @click="handleToPage(path)"
  >
    <MenuContent :icon="icon">
      <template #title>
        <slot name="title"></slot>
      </template>
    </MenuContent>
  </ElMenuItem>
</template>
