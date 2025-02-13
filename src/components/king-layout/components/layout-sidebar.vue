<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'

import { KingScrollbar } from '@/baseui'
import { Aside } from '@/baseui/ep'

import { SidebarCollapseButton, SidebarFixedButton } from './widgets'

interface Props {
  /**
   * 折叠区域高度
   * @default 42
   */
  collapseHeight?: number
  /**
   * 折叠宽度
   * @default 48
   */
  collapseWidth?: number
  /**
   * 隐藏的dom是否可见
   * @default true
   */
  domVisible?: boolean
  /**
   * 头部高度
   */
  headerHeight: number
  /**
   * 是否显示
   * @default true
   */
  show?: boolean
  /**
   * 宽度
   */
  width: number
  /**
   * zIndex
   * @default 0
   */
  zIndex?: number
}

const props = withDefaults(defineProps<Props>(), {
  collapseHeight: 42,
  collapseWidth: 60,
  show: true,
  domVisible: true,
  zIndex: 0
})

const collapse = defineModel<boolean>('collapse')
const expandOnHovering = defineModel<boolean>('expandOnHovering')
const expandOnHover = defineModel<boolean>('expandOnHover')

const hiddenSideStyle = computed((): CSSProperties => calcMenuWidthStyle(true))

const style = computed((): CSSProperties => {
  const { zIndex } = props
  return {
    ...calcMenuWidthStyle(false),
    height: `100%`,
    zIndex
  }
})

const contentStyle = computed((): CSSProperties => {
  const { collapseHeight, headerHeight } = props

  return {
    height: `calc(100vh - ${headerHeight + collapseHeight}px)`,
    paddingTop: '8px'
  }
})

const headerStyle = computed((): CSSProperties => {
  const { headerHeight } = props

  return {
    height: `${headerHeight}px`
  }
})

const collapseStyle = computed((): CSSProperties => {
  return {
    height: `${props.collapseHeight}px`
  }
})

function calcMenuWidthStyle(isHiddenDom: boolean): CSSProperties {
  const { width, show } = props

  let widthValue = width === 0 ? '0px' : `${width}px`

  const { collapseWidth } = props

  if (isHiddenDom && expandOnHovering.value && !expandOnHover.value) {
    widthValue = `${collapseWidth}px`
  }

  return {
    ...(widthValue === '0px' ? { overflow: 'hidden' } : {}),
    flex: `0 0 ${widthValue}`,
    marginLeft: show ? 0 : `-${widthValue}`,
    maxWidth: widthValue,
    minWidth: widthValue,
    width: widthValue
  }
}

function handleMouseenter(e: MouseEvent) {
  if (e?.offsetX < 10) {
    return
  }

  // 未开启和未折叠状态不生效
  if (expandOnHover.value) {
    return
  }
  if (!expandOnHovering.value) {
    collapse.value = false
  }

  expandOnHovering.value = true
}

function handleMouseleave() {
  if (expandOnHover.value) {
    return
  }

  expandOnHovering.value = false
  collapse.value = true
}
</script>

<template>
  <div
    v-if="domVisible"
    :style="hiddenSideStyle"
    class="h-full transition-all duration-150"
  ></div>

  <Aside
    :style="style"
    class="fixed left-0 top-0 h-full bg-sidebar transition-all duration-150 br-1-$H:border"
    @mouseenter="handleMouseenter"
    @mouseleave="handleMouseleave"
  >
    <SidebarFixedButton
      v-if="domVisible && !collapse"
      v-model:expand-on-hover="expandOnHover"
    />

    <div :style="headerStyle">
      <slot name="logo"></slot>
    </div>

    <KingScrollbar :style="contentStyle">
      <slot name="menu"></slot>
    </KingScrollbar>

    <SidebarCollapseButton v-if="domVisible" v-model:collapsed="collapse" />

    <div :style="collapseStyle"></div>
  </Aside>
</template>

<style lang="scss" scoped></style>
