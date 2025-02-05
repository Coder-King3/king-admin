<script setup lang="ts">
import type { LayoutProps } from './layout'

import { computed } from 'vue'

import { LayoutContent } from './content'
import { LayoutFooter } from './footer'
import { LayoutHeader } from './header'
import { LayoutSidebar } from './sidebar'
import { LayoutTabbar } from './tabbar'

defineOptions({
  name: 'BasicLayout'
})

interface Props extends LayoutProps {}

const props = withDefaults(defineProps<Props>(), {
  headerHeight: 50,
  headerHidden: false,
  sidebarHidden: false,
  sidebarTheme: 'dark',
  sidebarWidth: 224,
  sideCollapseWidth: 60
})

/**
 * 动态获取侧边宽度
 */
const getSidebarWidth = computed(() => {
  const { sidebarHidden, sidebarWidth } = props

  let width = 0

  if (sidebarHidden) {
    return width
  }

  width = sidebarWidth

  return width
})
</script>

<template>
  <div class="relative min-h-full w-full flex">
    <LayoutSidebar
      :collapse-width="sideCollapseWidth"
      :header-height="headerHeight"
      :width="getSidebarWidth"
    >
      <template #menu>
        <el-menu default-active="2" class="el-menu-vertical-demo">
          <el-sub-menu index="1">
            <template #title>
              <SvgIcon icon="ep:location" />
              <span>Navigator One</span>
            </template>
            <el-menu-item-group>
              <template #title><span>Group One</span></template>
              <el-menu-item index="1-1">item one</el-menu-item>
              <el-menu-item index="1-2">item two</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group Two">
              <el-menu-item index="1-3">item three</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
              <template #title><span>item four</span></template>
              <el-menu-item index="1-4-1">item one</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-menu-item index="2">
            <SvgIcon icon="ep:menu" />
            <template #title>Navigator Two</template>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <SvgIcon icon="ep:document" />

            <template #title>Navigator Three</template>
          </el-menu-item>
          <el-menu-item index="4">
            <SvgIcon icon="ep:setting" />
            <template #title>Navigator Four</template>
          </el-menu-item>
        </el-menu>
      </template>
    </LayoutSidebar>
    <div class="flex flex-1 flex-col transition-all duration-300 ease-in">
      <div class="overflow-hidden transition-all duration-200">
        <LayoutHeader />
        <LayoutTabbar />
      </div>

      <LayoutContent />
      <LayoutFooter />
    </div>
  </div>
</template>
