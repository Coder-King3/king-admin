<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'

interface Props {
  // /**
  //  * 横屏
  //  */
  // fullWidth: boolean;
  /**
   * 高度
   */
  height: number
  // /**
  //  * 是否移动端
  //  */
  isMobile: boolean
  // /**
  //  * 是否显示
  //  */
  // show: boolean;
  // /**
  //  * 侧边菜单宽度
  //  */
  // sidebarWidth: number
  // /**
  //  * 主题
  //  */
  // theme: string | undefined;
  // /**
  //  * 宽度
  //  */
  // width: string;
  // /**
  //  * zIndex
  //  */
  // zIndex: number;
}

const props = defineProps<Props>()

const style = computed((): CSSProperties => {
  const { height } = props
  // const { fullWidth, height, show } = props;
  // const right = !show || !fullWidth ? undefined : 0;

  return {
    height: `${height}px`
    // marginTop: show ? 0 : `-${height}px`,
    // right,
  }
})

const logoStyle = computed((): CSSProperties => {
  return {
    minWidth: `${props.isMobile ? 40 : 0}px`
  }
})
</script>

<template>
  <!--   top-0   transition-[margin-top] duration-200 -->
  <ElHeader
    :style="style"
    class="w-full flex flex-[0_0_auto] items-center bg-header p-0 pl-2 bb-1-$H:border"
  >
    <div v-if="$slots.logo" :style="logoStyle">
      <slot name="logo"></slot>
    </div>

    <slot name="toggle-button"> </slot>

    <slot></slot>
  </ElHeader>
</template>

<style lang="scss" scoped></style>
