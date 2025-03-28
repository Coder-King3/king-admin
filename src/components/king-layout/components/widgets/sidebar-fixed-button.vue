<script setup lang="ts">
import { KingIcon } from '@baseui'

defineOptions({ name: 'SidebarFixedButton' })

const expandOnHover = defineModel<boolean>('expandOnHover')

function toggleFixed() {
  expandOnHover.value = !expandOnHover.value
}
</script>

<template>
  <div
    class="absolute bottom-2 right-3 z-10 flex-center cursor-pointer rounded-sm bg-accent p-[5px] text-foreground/60 hover:bg-accent-hover hover:text-foreground"
    @click="toggleFixed"
  >
    <KingIcon v-if="!expandOnHover" class="size-3.5" icon="lucide:pin-off" />
    <KingIcon v-else class="size-3.5" icon="lucide:pin" />
  </div>
</template>
