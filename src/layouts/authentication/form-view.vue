<script setup lang="ts">
defineOptions({ name: 'AuthenticationFormView' })
</script>

<template>
  <div class="login-form-bg flex-col-center relative lg:flex-initial">
    <div
      class="flex-col-center size-full px-6 py-10 bl-1-$king-border-color lg:px-8"
    >
      <!-- Router View with Transition and KeepAlive -->
      <RouterView v-slot="{ Component, route }">
        <Transition appear mode="out-in" name="slide-right">
          <KeepAlive :include="['Login']">
            <component
              :is="Component"
              :key="route.fullPath"
              class="enter-x mt-6 w-full sm:mx-auto md:max-w-md"
            />
          </KeepAlive>
        </Transition>
      </RouterView>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-form-bg {
  background: linear-gradient(
    130deg,
    rgba(#ffffff, 0.3),
    rgba(#ffffff, 0.5),
    rgba(#ffffff, 0.7),
    rgba(#ffffff, 0.8),
    rgba(#ffffff, 0.89),
    rgba(#ffffff, 0.9),
    rgba(#ffffff, 0.95),
    rgba(#ffffff, 1)
  );
}
.dark .login-form-bg {
  background: var(--el-bg-color);
}
</style>
