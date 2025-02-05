<script setup lang="ts">
defineOptions({ name: 'SidebarFixedButton' })

const collapsed = defineModel<boolean>('collapsed')

function handleCollapsed() {
  collapsed.value = !collapsed.value
}
</script>

<template>
  <div
    class="absolute bottom-2 left-3 z-10 flex-center cursor-pointer rounded-sm bg-accent p-1 text-foreground/60 hover:bg-accent-hover hover:text-foreground"
    @click.stop="handleCollapsed"
  >
    <SvgIcon v-if="collapsed" class="size-4" icon="lucide:chevrons-right" />
    <SvgIcon v-else class="size-4" icon="lucide:chevrons-left" />
  </div>
</template>
