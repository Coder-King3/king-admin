<script setup lang="ts">
defineOptions({ name: 'SidebarCollapseButton' })

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
    <SvgIcon v-if="expandOnHover" class="size-3.5" icon="lucide:pin-off" />
    <SvgIcon v-else class="size-3.5" icon="lucide:pin" />
  </div>
</template>
