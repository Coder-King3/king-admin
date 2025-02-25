<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from 'vue-router'

// 页面切换动画
function getTransitionName(_route: RouteLocationNormalizedLoaded) {
  // 如果偏好设置未设置，则不使用动画
  // const { tabbar, transition } = preferences;
  // const transitionName = transition.name;
  const transitionName = 'fide-in'
  // if (!transitionName || !transition.enable) {
  //   return;
  // }

  // // 标签页未启用或者未开启缓存，则使用全局配置动画
  // if (!tabbar.enable || !keepAlive) {
  //   return transitionName;
  // }

  return transitionName
}
</script>

<template>
  <div class="relative h-full">
    <!-- <IFrameRouterView /> -->
    <RouterView v-slot="{ Component, route }">
      <Transition :name="getTransitionName(route)" appear mode="out-in">
        <!-- <KeepAlive
            v-if="keepAlive"
            :exclude="getExcludeCachedTabs"
            :include="getCachedTabs"
          >
            <component
              :is="transformComponent(Component, route)"
              v-if="renderRouteView"
              v-show="!route.meta.iframeSrc"
              :key="route.fullPath"
            />
          </KeepAlive>
          <component
            :is="Component"
            v-else-if="renderRouteView"
            :key="route.fullPath"
          /> -->
        <component :is="Component" :key="route.fullPath" />
      </Transition>
    </RouterView>
  </div>
</template>

<style lang="scss" scoped></style>
