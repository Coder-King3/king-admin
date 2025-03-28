<script setup lang="ts">
import { ref } from 'vue'

import { KingIcon } from '../icon'
import PasswordStrength from './password-strength.vue'

defineOptions({
  name: 'InputPassword',
  // eslint-disable-next-line perfectionist/sort-objects
  inheritAttrs: false
})

interface Props {
  class?: any
  /**
   * 是否显示密码强度
   */
  passwordStrength?: boolean
}

const props = defineProps<Props>()

const modelValue = defineModel<string>()

// const slots = useSlots()

const show = ref(false)
</script>

<template>
  <div class="relative w-full">
    <ElInput
      v-bind="$attrs"
      v-model="modelValue"
      :class="props.class"
      :type="show ? 'text' : 'password'"
    />
    <template v-if="passwordStrength">
      <PasswordStrength :password="modelValue" />
      <p
        v-if="$slots.strengthText"
        class="mt-1.5 text-xs text-muted-foreground"
      >
        <slot name="strengthText"> </slot>
      </p>
    </template>
    <div
      class="absolute inset-y-0 right-0 flex cursor-pointer pr-3 text-lg text-foreground/60 hover:text-foreground"
      :class="{
        'top-3': !!passwordStrength,
        'top-1/2 -translate-y-1/2 items-center': !passwordStrength
      }"
      @click="show = !show"
    >
      <KingIcon v-if="show" icon="lucide:eye" class="size-4" />
      <KingIcon v-else icon="lucide:eye-off" class="size-4" />
    </div>
  </div>
</template>
