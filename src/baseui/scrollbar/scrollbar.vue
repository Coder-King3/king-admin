<script setup lang="ts">
import { Scrollbar } from '../ep'

// interface Props {}

defineOptions({ name: 'KingScrollbar' })

// const props = withDefaults(defineProps<Props>(), {})
</script>

<template>
  <Scrollbar>
    <template #default>
      <slot></slot>
    </template>
  </Scrollbar>
</template>
