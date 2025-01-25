<script setup lang="ts">
import { computed, ref } from 'vue'

import { APP_NAME } from '@/constants'
import { $t } from '@/locales'

import AuthenticationFormView from './form-view.vue'
import Toolbar from './toolbar.vue'

defineOptions({ name: 'Authentication' })

const appName = ref(APP_NAME)
const logo = ref('svg:logo')
const pageTitle = computed(() =>
  $t('auth.systemWelcome', { params: [APP_NAME] })
)
const pageDescribe = computed(() => $t('auth.description'))
</script>

<template>
  <div class="min-h-full flex select-none overflow-x-hidden">
    <!-- 应用logo -->
    <div class="absolute left-0 top-0 z-10">
      <!--  -->
      <div class="ml-4 mt-3.5 flex items-center text-foreground">
        <!-- 使用 SvgIcon svg方案 -->
        <SvgIcon :icon="logo" class="mr-2 size-42px" />
        <!-- unocss icon 动态绑定/动态icon有概率显示不出来 -->
        <!-- <div :class="`icon-${logo}`" class="mr-2 size-42"></div> -->
        <p class="text-xl font-medium">{{ appName }}</p>
      </div>
    </div>

    <!-- 工具栏 -->
    <Toolbar />

    <!-- 系统介绍 -->
    <div class="relative hidden w-0 flex-1 lg:block">
      <div class="absolute inset-0 size-full">
        <div class="login-background absolute left-0 top-0 size-full"></div>
        <div class="-enter-x z-10 mr-20 min-h-full flex-center flex-col pb-6">
          <div icon-svg:chart-data-disk class="animate-float size-320px"></div>
          <div class="mt-10 text-2xl text-$el-text-color-primary font-sans">
            {{ pageTitle }}
          </div>
          <div class="mt-2 text-$el-text-color-primary">
            {{ pageDescribe }}
          </div>
        </div>
      </div>
    </div>

    <!-- 认证面板 -->
    <AuthenticationFormView class="min-h-full w-[34%] flex-1" />
  </div>
</template>

<style lang="scss" scoped>
.login-background {
  background: linear-gradient(
    150deg,
    rgb(7 7 9 / 8.24%) 30%,
    rgba(#2575f2, 0.6) 40%,
    rgba(#6a11c1, 0.3) 45%,
    rgb(7 7 9 / 8.24%) 60%
  );
  filter: blur(100px);
}
</style>
