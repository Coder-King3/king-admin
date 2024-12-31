<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import type { FormApiInstance } from '../form-api'
import FormField from './form-field.vue'
import { useFormHelper } from './helper'
import { useFormInitial } from './initial'

interface Props {
  formApi: FormApiInstance
}

const { formApi } = defineProps<Props>()
const options = formApi.getOptions()

const formRef = useTemplateRef('formRef') as never

const state = formApi.getState()

const { delegatedSlots, isHorizontal } = useFormInitial(options.value)

const { componentContent, componentField } = useFormHelper(formApi)

formApi?.mount?.(formRef)

const computedSchema = computed(() => {
  return (options.value.schema || []).map((schema) => {
    const commonConfig = options.value?.commonConfig || {}
    const hideLabel = schema.hideLabel ? true : commonConfig?.hideLabel
    const disabled = schema.hideLabel ? true : commonConfig?.disabled
    const formItemProps = {
      ...(commonConfig?.formItemProps || {}),
      ...(schema?.formItemProps || {})
    }
    const componentProps = {
      ...(commonConfig?.componentProps || {}),
      ...(schema?.componentProps || {})
    }

    return {
      ...schema,
      formItemProps,
      componentProps,
      hideLabel,
      disabled
    }
  })
})
</script>

<template>
  <ElForm
    ref="formRef"
    v-bind="options.formProps"
    :model="state"
    :rules="options.rules"
    :inline="isHorizontal"
  >
    <template v-for="cSchema in computedSchema" :key="cSchema.fieldName">
      <FormField
        v-bind="cSchema"
        :componentField="componentField"
        :componentContent="componentContent"
      >
        <template
          v-for="slotName in delegatedSlots"
          :key="slotName"
          #[slotName]="slotProps"
        >
          <slot :name="slotName" v-bind="slotProps"></slot>
        </template>
      </FormField>
    </template>
  </ElForm>
</template>

<style lang="scss" scoped></style>
