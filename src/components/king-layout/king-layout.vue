<script setup lang="ts">
import type { LayoutProps } from './king-layout'

import { computed, type CSSProperties, ref, watch } from 'vue'

import { KingIconButton } from '@/baseui'
import { LucideMenu } from '@/components'

import {
  LayoutContent,
  LayoutFooter,
  LayoutHeader,
  LayoutSidebar,
  LayoutTabbar
} from './components'

defineOptions({
  name: 'KingLayout'
})

interface Props extends LayoutProps {}

const props = withDefaults(defineProps<Props>(), {
  footerEnable: false,
  footerFixed: true,
  footerHeight: 32,
  headerHeight: 50,
  headerHidden: false,
  isMobile: false,
  sidebarCollapseShowTitle: false,
  sidebarCollapseTitleWidth: 80,
  sidebarHidden: false,
  sidebarTheme: 'dark',
  sidebarWidth: 224,
  sideCollapseWidth: 60,
  tabbarEnable: true,
  tabbarHeight: 40,
  zIndex: 200
})

const emit = defineEmits<{ toggleSidebar: [] }>()
const sidebarCollapse = defineModel<boolean>('sidebarCollapse')
const sidebarExpandOnHover = defineModel<boolean>('sidebarExpandOnHover')

/**
 * 侧边栏是否可见
 * @default true
 */
const sidebarEnable = defineModel<boolean>('sidebarEnable', { default: true })

// side是否处于hover状态展开菜单中
const sidebarExpandOnHovering = ref(false)

/**
 * 侧边栏z-index
 */
const sidebarZIndex = computed(() => {
  const { isMobile, zIndex } = props

  const offset = isMobile ? 1 : -1

  return zIndex + offset
})

const maskStyle = computed((): CSSProperties => {
  return { zIndex: props.zIndex }
})

const getSideCollapseWidth = computed(() => {
  const {
    sidebarCollapseShowTitle,
    sidebarCollapseTitleWidth,
    sideCollapseWidth
  } = props

  return sidebarCollapseShowTitle
    ? sidebarCollapseTitleWidth
    : sideCollapseWidth
})

/**
 * 动态获取侧边宽度
 */
const getSidebarWidth = computed(() => {
  const { isMobile, sidebarHidden, sidebarWidth } = props

  let width = 0

  if (sidebarHidden) {
    return width
  }

  if (sidebarCollapse.value) {
    width = isMobile ? 0 : getSideCollapseWidth.value
  } else {
    width = sidebarWidth
  }

  return width
})

const showSidebar = computed(() => {
  return sidebarEnable.value && !props.sidebarHidden
})

/**
 * 遮罩可见性
 */
const maskVisible = computed(() => !sidebarCollapse.value && props.isMobile)

const showHeaderLogo = computed(() => {
  return props.isMobile
})

watch(
  () => props.isMobile,
  (val) => {
    if (val) {
      sidebarCollapse.value = true

      if (props.sidebarHidden) emit('toggleSidebar')
    }
  },
  {
    immediate: true
  }
)

function handleClickMask() {
  sidebarCollapse.value = true
}

function handleHeaderToggle() {
  if (props.isMobile) {
    sidebarCollapse.value = false
  } else {
    emit('toggleSidebar')
  }
}
</script>

<template>
  <div class="relative min-h-full w-full flex">
    <LayoutSidebar
      v-model:collapse="sidebarCollapse"
      v-model:expand-on-hover="sidebarExpandOnHover"
      v-model:expand-on-hovering="sidebarExpandOnHovering"
      :collapse-width="sideCollapseWidth"
      :header-height="headerHeight"
      :dom-visible="!isMobile"
      :show="showSidebar"
      :width="getSidebarWidth"
      :z-index="sidebarZIndex"
    >
      <template #logo>
        <slot name="logo"></slot>
      </template>
      <template #menu>
        <slot name="menu"></slot>
      </template>
    </LayoutSidebar>
    <div class="flex flex-1 flex-col transition-all ease-in">
      <div class="overflow-hidden transition-all">
        <LayoutHeader :height="headerHeight" :is-mobile="isMobile">
          <template v-if="showHeaderLogo" #logo>
            <slot name="logo"></slot>
          </template>

          <template #toggle-button>
            <KingIconButton class="mr-1 rounded-md" @click="handleHeaderToggle">
              <LucideMenu class="size-4" />
            </KingIconButton>
          </template>

          <slot name="header"></slot>
        </LayoutHeader>
        <LayoutTabbar>
          <slot name="tabbar"></slot>
        </LayoutTabbar>
      </div>

      <LayoutContent />

      <LayoutFooter
        v-if="footerEnable"
        :fixed="footerFixed"
        :height="footerHeight"
        :show="true"
        width="100%"
        :z-index="zIndex"
      >
        <!-- :show="!isFullContent"
        :width="footerWidth" -->
        <slot name="footer"></slot>
      </LayoutFooter>
    </div>
    <div
      v-if="maskVisible"
      :style="maskStyle"
      class="bg-overlay fixed left-0 top-0 h-full w-full transition-[background-color] duration-200"
      @click="handleClickMask"
    ></div>
  </div>
</template>
