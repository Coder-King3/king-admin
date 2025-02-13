<script setup lang="ts">
import { type Component, computed } from 'vue'

import { isFunction, isHttpUrl, isObject, isString } from '@/utils'

import { IconifyIcon } from '../iconify'

defineOptions({ name: 'Icon', inheritAttrs: false })

interface Props {
  icon?: Component | Function | string
  size?: number
}

const props = withDefaults(defineProps<Props>(), {
  icon: undefined,
  size: 1.2
})

const isRemoteIcon = computed(() => {
  return isString(props.icon) && isHttpUrl(props.icon)
})

const isComponent = computed(() => {
  const { icon } = props
  return !isString(icon) && (isObject(icon) || isFunction(icon))
})
const presets = 'king-icon inline-block overflow-hidden vertical-middle'

const stringIcon = computed(() => {
  const { icon } = props
  return icon as string
})

const componentIcon = computed(() => {
  const { icon } = props
  return icon as Component
})
</script>

<template>
  <component
    v-if="isComponent"
    :is="componentIcon"
    :class="presets"
    v-bind="$attrs"
  />
  <img v-else-if="isRemoteIcon" :src="stringIcon" v-bind="$attrs" />
  <IconifyIcon
    v-else-if="icon"
    :icon="stringIcon"
    :height="`${size}em`"
    :width="`${size}em`"
    :class="presets"
    v-bind="$attrs"
  />
</template>
