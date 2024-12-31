<script setup lang="ts">
import { ref, useSlots } from 'vue'

import PasswordStrength from './password-strength.vue'

defineOptions({ name: 'InputPassword', inheritAttrs: false })

interface Props {
  class?: any
  /**
   * 是否显示密码强度
   */
  passwordStrength?: boolean
}

const props = defineProps<Props>()

const modelValue = defineModel<string>()

const slots = useSlots()

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
        v-if="slots.strengthText"
        class="text-$king-text-color-muted mt-1.5 text-xs"
      >
        <slot name="strengthText"> </slot>
      </p>
    </template>
    <div
      class="text-$el-text-color-secondary absolute inset-y-0 right-0 flex cursor-pointer pr-3 text-lg leading-5"
      :class="{
        'top-3': !!passwordStrength,
        'top-1/2 -translate-y-1/2 items-center': !passwordStrength
      }"
      @click="show = !show"
    >
      <SvgIcon v-if="show" icon="lucide:eye" class="size-4" />
      <SvgIcon v-else icon="lucide:eye-off" class="size-4" />
    </div>
  </div>
</template>
