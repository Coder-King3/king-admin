<script setup lang="ts">
defineOptions({ name: 'AuthenticationFormTitle' })
</script>

<template>
  <div class="mb-7 sm:(mx-auto max-w-md w-full)">
    <h2
      class="mb-3 text-3xl text-foreground font-bold leading-9 tracking-tight lg:text-4xl"
    >
      <slot></slot>
    </h2>
    <p class="lg:text-md text-sm">
      <span class="text-muted-foreground">
        <slot name="desc"></slot>
      </span>
    </p>
  </div>
</template>
<style lang="scss" scoped></style>
