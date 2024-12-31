<script setup lang="ts">
defineOptions({ name: 'AuthenticationFormTitle' })
</script>

<template>
  <div class="mb-7 sm>[mx-auto_w-full_max-w-md]">
    <h2
      class="mb-3 text-3xl text-$text-color-primary font-bold leading-9 tracking-tight lg:text-4xl"
    >
      <slot></slot>
    </h2>
    <p class="lg:text-md text-sm text-$king-text-color-muted">
      <slot name="desc"></slot>
    </p>
  </div>
</template>

<style lang="scss" scoped></style>
