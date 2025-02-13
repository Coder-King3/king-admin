<script setup lang="ts">
import { cn } from '@/utils'

import { KingIcon } from '../icons'

interface Props {
  /**
   * 是否收起文本
   */
  collapsed?: boolean
  /**
   * Logo 跳转地址
   */
  href?: string
  /**
   * Logo 图片大小
   */
  logoSize?: number
  /**
   * Logo 图标
   */
  src?: string
  /**
   * Logo 文本
   */
  text: string
}

defineOptions({ name: 'KingLogo' })

withDefaults(defineProps<Props>(), {
  collapsed: false,
  logoSize: 32,
  href: 'javascript:void 0',
  src: ''
})
</script>

<template>
  <div class="h-full flex items-center text-lg">
    <a
      :class="cn($attrs.class as any, { 'mx-auto': collapsed })"
      :href="href"
      class="h-full flex items-center gap-2 overflow-hidden px-3 text-lg leading-normal transition-all duration-500"
    >
      <!-- <Avatar
        v-if="src"
        :alt="text"
        :src="src"
        class="relative w-8 rounded-none bg-transparent"
      /> -->
      <KingIcon
        v-if="src"
        :icon="src"
        :class="`relative size-${logoSize}px rounded-none bg-transparent text-foreground`"
      />
      <span
        v-if="!collapsed"
        class="truncate text-nowrap text-foreground font-semibold"
      >
        {{ text }}
      </span>
    </a>
  </div>
</template>
