<script setup lang="ts">
import { type Component } from 'vue'

import { KingIcon } from '@baseui'

interface Props {
  icon?: Component | string
}

defineOptions({ name: 'MenuContent' })

defineProps<Props>()

const menuContentClassName = 'king-menu-content'
const block = (name: string) => {
  return `${menuContentClassName}__${name}`
}
</script>

<template>
  <KingIcon v-if="icon" :class="block('icon')" :icon="icon" />
  <div :class="block('title')">
    <slot name="title"></slot>
  </div>
</template>
