<script setup lang="ts">
import { computed } from 'vue'

import { $t } from '@/locales'

defineOptions({ name: 'FormMessage' })

interface Props {
  error?: string
}

const props = defineProps<Props>()

const message = computed(() => {
  const code = (props.error as any)?.code
  return code ? $t(code) : props.error
})
</script>
<template>
  <div
    class="form-message absolute top-100% mt--6px text-0.8rem text-destructive"
  >
    {{ message }}
  </div>
</template>
