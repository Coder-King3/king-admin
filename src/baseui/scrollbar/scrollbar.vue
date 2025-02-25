<script setup lang="ts">
// interface Props {}

defineOptions({ name: 'KingScrollbar' })

// const props = withDefaults(defineProps<Props>(), {})
</script>

<template>
  <ElScrollbar>
    <template #default>
      <slot></slot>
    </template>
  </ElScrollbar>
</template>
