<script setup lang="ts">
import { computed, type ComputedRef } from 'vue'
import type { FormSchema, RenderComponentContentType } from '../types'
import { RenderContent } from '@/baseui'
import { componentMap } from '../config'
import { isString } from '@/utils'

interface Props extends FormSchema {
  componentField: {
    fieldValue: (fieldName: string) => ComputedRef<any>
    setFieldValue: (filed: string, value: any) => void
  }
  componentContent: {
    customContentRender: (
      renderComponentContent?: RenderComponentContentType
    ) => ComputedRef<Record<string, any>>
    renderContentKey: (
      customContentRender: ComputedRef<Record<string, any>>
    ) => ComputedRef<string[]>
  }
}

const {
  component,
  componentProps,
  componentField,
  componentContent,
  renderComponentContent,
  fieldName,
  label,
  rules,
  hideLabel,
  disabled,
  formItemProps
} = defineProps<Props>()

const fieldValue = componentField.fieldValue(fieldName)
const getComponentModel = computed({
  get() {
    return fieldValue.value
  },
  set(value) {
    componentField.setFieldValue(fieldName, value)
  }
})

const customContentRender = componentContent.customContentRender(
  renderComponentContent
)
const renderContentKey = componentContent.renderContentKey(customContentRender)

const FieldComponent = computed(() => {
  const finalComponent = isString(component)
    ? componentMap.get(component)
    : component

  if (!finalComponent) {
    // 组件未注册
    console.warn(`Component ${component} is not registered`)
  }
  return finalComponent
})
</script>

<template>
  <ElFormItem v-bind="formItemProps" :prop="fieldName" :rules="rules">
    <template v-if="!hideLabel" #label>
      {{ label }}
    </template>
    <component
      :is="FieldComponent"
      v-model="getComponentModel"
      v-bind="componentProps"
      :disabled="disabled"
    >
      <template
        v-for="name in renderContentKey"
        :key="name"
        #[name]="slotProps"
      >
        <RenderContent
          :content="customContentRender[name]"
          v-bind="slotProps"
        />
      </template>
    </component>
  </ElFormItem>
</template>
