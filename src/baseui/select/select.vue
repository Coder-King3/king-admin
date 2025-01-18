<script setup lang="ts">
import { Option, Select } from '@/baseui/ep'

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
  <Select :placeholder="placeholder" :class="props.class">
    <template #label="{ value }">
      <span>{{ props.showLabel ? getLabelValue(value) : value }}</span>
    </template>
    <Option v-for="item in options" :key="item.value" :value="item.value">
      {{ item.label }}
    </Option>
  </Select>
</template>
