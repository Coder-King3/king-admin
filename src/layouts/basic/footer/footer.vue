<script lang="ts" setup>
defineOptions({
  name: 'LayoutFooter'
})
</script>

<template>
  <div class="relative h-full w-full flex-center text-xs text-muted-foreground">
    <slot></slot>
  </div>
</template>
