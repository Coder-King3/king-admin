<script setup lang="ts">
import { LanguageToggle, ThemeToggle } from '@/components'

defineOptions({ name: 'AuthenticationToolbar' })
</script>

<template>
  <div
    class="absolute right-2 top-4 z-10 flex-center rounded-3xl bg-accent px-3 py-1"
  >
    <!-- <div class="p-6px size-32px"></div> -->
    <LanguageToggle />
    <ThemeToggle />
  </div>
</template>
<style lang="scss" scoped></style>
