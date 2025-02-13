<script setup lang="ts">
import { KingIcon } from '@/baseui'

defineOptions({ name: 'SidebarCollapseButton' })
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
    <KingIcon v-if="collapsed" class="size-4" icon="lucide:chevrons-right" />
    <KingIcon v-else class="size-4" icon="lucide:chevrons-left" />
  </div>
</template>
