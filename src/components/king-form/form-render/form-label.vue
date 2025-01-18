<script setup lang="ts">
defineOptions({ name: 'FormLabel' })
</script>

<template>
  <label
    class="form-label flex items-center text-sm font-medium disabled:(cursor-not-allowed opacity-70)"
  >
    <slot></slot>
  </label>
</template>
