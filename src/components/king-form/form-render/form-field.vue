<script setup lang="ts">
import type { Recordable } from '@types'

import type { FormSchema, RenderComponentContentType } from '../types'

import { computed, type ComputedRef } from 'vue'

import { KingRenderContent } from '@baseui'

import { isString } from '@/utils'

import { componentMap } from '../config'
import FormLabel from './form-label.vue'

interface Props extends FormSchema {
  componentContent: {
    customContentRender: (
      renderComponentContent?: RenderComponentContentType
    ) => ComputedRef<Recordable>
    renderContentKey: (
      customContentRender: ComputedRef<Recordable>
    ) => ComputedRef<string[]>
  }
  componentField: {
    fieldValue: (fieldName: string) => ComputedRef<any>
    setFieldValue: (filed: string, value: any) => void
  }
}

const {
  component,
  componentContent,
  componentField,
  componentProps,
  disabled,
  fieldName,
  formItemProps,
  hideLabel,
  label,
  renderComponentContent,
  rules
} = defineProps<Props>()

const fieldProps = computed<Recordable>(() => ({
  ...formItemProps,
  prop: fieldName,
  rules
}))

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

const fieldComponentAttrs = computed(() => {
  const eventHandlers: Recordable = {}
  const otherProps: Recordable = {}
  for (const [key, value] of Object.entries(componentProps || {})) {
    if (key.startsWith('on')) {
      const eventName = key
        .slice(2)
        .replace(/^[A-Z]/, (match) => match.toLowerCase())
      eventHandlers[eventName] = value
      // eventHandlers[key] = value
    } else {
      otherProps[key] = value
    }
  }

  return {
    handlers: eventHandlers,
    props: {
      ...otherProps,
      disabled
    }
  }
})

// const fieldComponentProps = computed(() => {
//   console.log(`componentProps:`, componentProps)
//   return {
//     ...componentProps,
//     disabled
//   }
// })
</script>

<template>
  <ElFormItem v-bind="fieldProps">
    <!-- Label -->
    <template v-if="!hideLabel" #label>
      <FormLabel>
        {{ label }}
      </FormLabel>
    </template>

    <!-- Controls -->
    <component
      :is="FieldComponent"
      v-model="getComponentModel"
      v-bind="fieldComponentAttrs.props"
      v-on="fieldComponentAttrs.handlers"
    >
      <template
        v-for="name in renderContentKey"
        :key="name"
        #[name]="slotProps"
      >
        <KingRenderContent
          :content="customContentRender[name]"
          v-bind="slotProps"
        />
      </template>
    </component>

    <!-- Error message -->
    <template #error="{ error }">
      <Transition name="slide-up">
        <FormMessage :error="error" />
      </Transition>
    </template>
  </ElFormItem>
</template>
