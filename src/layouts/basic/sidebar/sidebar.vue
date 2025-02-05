<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'

import { KingScrollbar } from '@/baseui'
import { Aside } from '@/baseui/ep'
import { preferences } from '@/preferences'

import { SidebarCollapseButton, SidebarFixedButton } from '../widgets'
import Logo from './logo.vue'

defineOptions({ name: 'LayoutSidebar' })

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
   * 头部高度
   */
  headerHeight: number
  /**
   * 宽度
   */
  width: number
}

const props = withDefaults(defineProps<Props>(), {
  collapseHeight: 42,
  collapseWidth: 48
})

const collapse = defineModel<boolean>('collapse')
const expandOnHover = defineModel<boolean>('expandOnHover')

const style = computed((): CSSProperties => {
  return {
    ...calcMenuWidthStyle(),
    height: `100%`
  }
})

const contentStyle = computed((): CSSProperties => {
  const { collapseHeight, headerHeight } = props

  return {
    height: `calc(100vh - ${headerHeight + collapseHeight}px)`,
    paddingTop: '8px'
  }
})

const collapseStyle = computed((): CSSProperties => {
  return {
    height: `${props.collapseHeight}px`,
    position: 'relative'
  }
})

const headerStyle = computed((): CSSProperties => {
  const { headerHeight } = props

  return {
    height: `${headerHeight}px`
  }
})

function calcMenuWidthStyle(): CSSProperties {
  const { width } = props

  const widthValue = width === 0 ? '0px' : `${width}px`

  // const { collapseWidth } = props

  // if (isHiddenDom && expandOnHovering.value && !expandOnHover.value) {
  //   widthValue = `${collapseWidth}px`
  // }

  return {
    ...(widthValue === '0px' ? { overflow: 'hidden' } : {}),
    flex: `0 0 ${widthValue}`,
    // marginLeft: show ? 0 : `-${widthValue}`, /
    maxWidth: widthValue,
    minWidth: widthValue,
    width: widthValue
  }
}
</script>

<template>
  <Aside
    :style="style"
    class="bg-sidebar transition-all duration-150 br-1-$H:border"
  >
    <div :style="headerStyle">
      <Logo :src="preferences.logo.source" :text="preferences.app.name" />
    </div>

    <KingScrollbar :style="contentStyle">
      <slot name="menu"></slot>
    </KingScrollbar>

    <div :style="collapseStyle">
      <SidebarCollapseButton v-model:collapsed="collapse" />
      <SidebarFixedButton
        v-if="!collapse"
        v-model:expand-on-hover="expandOnHover"
      />
    </div>
  </Aside>
</template>

<style lang="scss" scoped></style>
