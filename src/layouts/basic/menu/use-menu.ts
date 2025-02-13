import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { preferences } from '@/preferences'
import { useAccessStore } from '@/store'

function useMenu() {
  const route = useRoute()
  const accessStore = useAccessStore()

  const sidebarVisible = computed(() => {
    const enableSidebar = preferences.sidebar.enable

    return enableSidebar
  })

  const sidebarMenus = computed(() => accessStore.accessMenus)

  /**
   * 侧边菜单激活路径
   */
  const sidebarActive = computed(() => {
    return (route?.meta?.activePath as string) ?? route.path
  })

  return {
    sidebarMenus,
    sidebarActive,
    sidebarVisible
  }
}

export { useMenu }
