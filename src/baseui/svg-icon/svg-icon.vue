<script setup lang="ts">
import { type Component, computed } from 'vue'
import { isFunction, isHttpUrl, isObject, isString } from '@/utils'
import { IconifyIcon } from './iconify'

defineOptions({ name: 'SvgIcon', inheritAttrs: false })

interface Props {
  icon?: Component | Function | string // icon name
  prefix?: string // icon prefix
  scale?: number // icon scale
  defaultClass?: string // icon default class
}

const props = withDefaults(defineProps<Props>(), {
  icon: undefined,
  prefix: '#icon-',
  scale: 1.2,
  defaultClass: 'king-icon'
})

const isRemoteIcon = computed(() => {
  return isString(props.icon) && isHttpUrl(props.icon)
})

const isComponent = computed(() => {
  const { icon } = props
  return !isString(icon) && (isObject(icon) || isFunction(icon))
})

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
    :class="defaultClass"
    v-bind="$attrs"
  />
  <img v-else-if="isRemoteIcon" :src="stringIcon" v-bind="$attrs" />
  <IconifyIcon
    v-else-if="icon"
    :icon="stringIcon"
    :width="`${scale}em`"
    :height="`${scale}em`"
    :class="defaultClass"
    v-bind="$attrs"
  />
</template>

<style lang="scss" scoped>
.king-icon {
  display: inline-block;
  overflow: hidden;
  vertical-align: middle;
  transition: var(--king-transition);
}
</style>
