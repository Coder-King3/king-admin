```ts
// config.ts
import type { Component } from 'vue'
import type { BaseFormComponentType } from './types'
import { ElInput } from 'element-plus'
import { InputPassword, Select } from '@/baseui'

const componentMap = new Map<BaseFormComponentType, Component>()

componentMap.set('Input', ElInput)
componentMap.set('InputPassword', InputPassword)
componentMap.set('Select', Select)

export function add(name: BaseFormComponentType, component: Component) {
  componentMap.set(name, component)
}

export function del(name: BaseFormComponentType) {
  componentMap.delete(name)
}

export { componentMap }
```

```vue
// form-field.vue
<script setup lang="ts">
import { FormItem } from '@/baseui/ui'
import type { FormSchema } from '../types'
import { isString } from '@/utils'
import { computed } from 'vue'
import { componentMap } from '../config'

interface Props extends FormSchema {
  fieldValue: any
  setFieldValue: (filed: string, value: any) => void
}

const {
  component,
  componentProps,
  fieldName,
  fieldValue,
  setFieldValue,
  label,
  rules,
  hideLabel,
  disabled,
  formItemProps
} = defineProps<Props>()

const getComponentModel = computed({
  get() {
    return fieldValue.value
  },
  set(value) {
    setFieldValue(fieldName, value)
  }
})

const FieldComponent = computed(() => {
  // ? COMPONENT_MAP[component]
  const finalComponent = isString(component)
    ? componentMap.get(component)
    : component

  console.log(`finalComponent:`, finalComponent)
  if (!finalComponent) {
    // 组件未注册
    console.warn(`Component ${component} is not registered`)
  }
  return finalComponent
})
</script>

<template>
  <FormItem v-bind="formItemProps" :prop="fieldName" :rules="rules">
    <template v-if="!hideLabel" #label>
      {{ label }}
    </template>
    <component
      :is="FieldComponent"
      v-model="getComponentModel"
      v-bind="componentProps"
      :disabled="disabled"
    >
    </component>
  </FormItem>
</template>

<style lang="scss" scoped></style>
```
