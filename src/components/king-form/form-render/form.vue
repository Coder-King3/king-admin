<script setup lang="ts">
import type { FormApiInstance } from '../form-api'
import type { BaseFormApiFnType } from '../types'

import type { Recordable } from '@/types'

import { computed, useTemplateRef } from 'vue'

import { Form } from '@/baseui/ep'
import { isFunction } from '@/utils'

import FormField from './form-field.vue'
import { useFormHelper } from './helper'
import { useFormInitial } from './initial'

interface Props {
  formApi: FormApiInstance
}

const { formApi } = defineProps<Props>()
const options = formApi.getOptions()
const state = formApi.getState()

const formRef = useTemplateRef('formRef') as never

const { delegatedSlots, isHorizontal } = useFormInitial(options.value)
const { componentContent, componentField, getItemApiConfig } =
  useFormHelper(formApi)

formApi?.mount?.(formRef)

const formProps = computed<Recordable>(() => ({
  ...options.value.formProps,
  model: state,
  rules: options.value.rules || {},
  inline: isHorizontal.value
}))

const getSchemaItemConfig = (schemaItem?: Recordable | BaseFormApiFnType) =>
  isFunction(schemaItem)
    ? getItemApiConfig(schemaItem as BaseFormApiFnType).value
    : schemaItem || {}

const computedSchema = computed(() => {
  return (options.value.schema || []).map((schema) => {
    const commonConfig = options.value?.commonConfig || {}
    const hideLabel =
      schema.hideLabel !== undefined
        ? schema.hideLabel
        : commonConfig?.hideLabel
    const disabled =
      schema.hideLabel !== undefined ? schema.hideLabel : commonConfig?.disabled

    const formItemProps = {
      ...(commonConfig?.formItemProps || {}),
      ...(schema?.formItemProps || {})
    }

    const schemaProps = schema?.componentProps
    const resolvedItemProps = getSchemaItemConfig(schemaProps)
    const componentProps = {
      ...(commonConfig?.componentProps || {}),
      ...resolvedItemProps
    }

    const schemaRules = schema?.rules
    const resolvedItemRules = getSchemaItemConfig(schemaRules)

    return {
      ...schema,
      rules: resolvedItemRules,
      componentProps,
      disabled,
      formItemProps,
      hideLabel
    }
  })
})
</script>

<template>
  <Form ref="formRef" v-bind="formProps">
    <template v-for="cSchema in computedSchema" :key="cSchema.fieldName">
      <FormField
        v-bind="cSchema"
        :component-field="componentField"
        :component-content="componentContent"
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
  </Form>
</template>

<style lang="scss" scoped></style>
