<script setup lang="ts">
import type { MenuRecordRaw } from '@types'

import { computed } from 'vue'

import { KingLogo } from '@baseui'
import { preferences, updatePreferences, usePreferences } from '@preferences'

import { KingAdminLayout } from '@/components/king-layout'
import { $t } from '@/locales'
import { cloneDeep, mapTree } from '@/utils'

import { LayoutHeader } from './header'
import { LayoutMenu, useMenu } from './menu'

defineOptions({
  name: 'BasicLayout'
})

const {
  // isDark,
  isMobile
  //   theme,
} = usePreferences()

// const userStore = useUserStore()
// const authStore = useAuthStore()
// const accessStore = useAccessStore()

const sidebarCollapsed = computed({
  get: () => preferences.sidebar.collapsed,
  set(value: boolean) {
    updatePreferences({ sidebar: { collapsed: value } })
  }
})

const sidebarExpandOnHover = computed({
  get: () => preferences.sidebar.expandOnHover,
  set(value: boolean) {
    updatePreferences({ sidebar: { expandOnHover: value } })
  }
})

// const sidebarTheme = computed(() => {
//   const dark = isDark.value
//   // const dark = isDark.value || preferences.theme.semiDarkSidebar;
//   return dark ? 'dark' : 'light'
// })

// const headerTheme = computed(() => {
//   const dark = isDark.value
//   // const dark = isDark.value || preferences.theme.semiDarkHeader;
//   return dark ? 'dark' : 'light'
// })

const isMenuRounded = computed(() => {
  // return false
  return preferences.navigation.styleType === 'rounded'
})

const logoCollapsed = computed(() => {
  if (isMobile.value && sidebarCollapsed.value) {
    return true
  }

  return sidebarCollapsed.value
})

const { sidebarActive, sidebarMenus, sidebarVisible } = useMenu()

/**
 * 包装菜单，翻译菜单名称
 * @param menus 原始菜单数据
 * @param deep 是否深度包装
 */
function wrapperMenus(menus: MenuRecordRaw[], deep: boolean = true) {
  return deep
    ? mapTree(menus, (item) => {
        return { ...cloneDeep(item), name: $t(item.name) }
      })
    : menus.map((item) => {
        return { ...cloneDeep(item), name: $t(item.name) }
      })
}

function toggleSidebar() {
  updatePreferences({
    sidebar: {
      hidden: !preferences.sidebar.hidden
    }
  })
}
</script>

<template>
  <KingAdminLayout
    v-model:sidebar-expand-on-hover="sidebarExpandOnHover"
    v-model:sidebar-collapse="sidebarCollapsed"
    :sidebar-collapse-show-title="preferences.sidebar.collapsedShowTitle"
    :sidebar-enable="sidebarVisible"
    :sidebar-width="preferences.sidebar.width"
    :sidebar-hidden="preferences.sidebar.hidden"
    :is-mobile="isMobile"
    @toggle-sidebar="toggleSidebar"
  >
    <!-- logo -->
    <template #logo>
      <KingLogo
        v-if="preferences.logo.enable"
        :collapsed="logoCollapsed"
        :src="preferences.logo.source"
        :text="preferences.app.name"
      />
    </template>
    <!-- 头部区域 -->
    <template #header>
      <LayoutHeader />
    </template>
    <template #extra>
      <!-- <AuthenticationLoginExpiredModal
        v-model:open="accessStore.loginExpired"
        :avatar
      >
        <LoginForm />
      </AuthenticationLoginExpiredModal> -->
    </template>
    <!-- 侧边菜单区域 -->
    <template #menu>
      <LayoutMenu
        :menus="wrapperMenus(sidebarMenus)"
        :theme="preferences.theme.mode"
        :rounded="isMenuRounded"
        :accordion="preferences.navigation.accordion"
        :collapse="preferences.sidebar.collapsed"
        :collapse-show-title="preferences.sidebar.collapsedShowTitle"
        :default-active="sidebarActive"
        mode="vertical"
      />
    </template>
  </KingAdminLayout>
</template>
