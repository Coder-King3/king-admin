<script setup lang="ts">
defineOptions({ name: 'AuthenticationFormView' })
</script>

<template>
  <div class="login-form-bg relative flex-col-center lg:flex-initial">
    <div class="size-full flex-col-center px-6 py-10 bl-1-$H:border lg:px-8">
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
    rgba(#fff, 0.3),
    rgba(#fff, 0.5),
    rgba(#fff, 0.7),
    rgba(#fff, 0.8),
    rgba(#fff, 0.89),
    rgba(#fff, 0.9),
    rgba(#fff, 0.95),
    rgba(#fff, 1)
  );
}

.dark .login-form-bg {
  background: hsl(var(--background-deep));
}
</style>
