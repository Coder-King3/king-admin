<script setup lang="ts">
defineOptions({ name: 'Select' })

interface Props {
  class?: any
  options?: Array<{ label: string; value: string }>
  placeholder?: string
  showLabel?: boolean
}

const props = defineProps<Props>()

const getLabelValue = (value: any) => {
  const option = props.options?.find((item) => item.value === value)
  return option?.label || null
}
</script>

<template>
  <ElSelect :placeholder="placeholder" :class="props.class">
    <template #label="{ value }">
      <span>{{ props.showLabel ? getLabelValue(value) : value }}</span>
    </template>
    <ElOption v-for="item in options" :key="item.value" :value="item.value">
      {{ item.label }}
    </ElOption>
  </ElSelect>
</template>
