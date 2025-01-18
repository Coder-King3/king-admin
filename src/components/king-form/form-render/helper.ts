import type { FormApiInstance } from '../form-api'
import type { BaseFormApiFnType, RenderComponentContentType } from '../types'

import { computed, type ComputedRef } from 'vue'

import { isFunction } from '@/utils'

export const useFormHelper = (formApi: FormApiInstance) => {
  const baseFormApiFn = (formApiFn?: any) =>
    computed(() => {
      if (!isFunction(formApiFn)) {
        return {}
      }
      return formApiFn(formApi.getValues(), formApi)
    })

  const componentField = {
    fieldValue: (fieldName: string) => formApi.getFieldValue(fieldName),
    setFieldValue: (filed: string, value: any) =>
      formApi.setFieldValue(filed, value)
  }

  const componentContent = {
    customContentRender: (
      renderComponentContent?: RenderComponentContentType
    ) => {
      return baseFormApiFn(renderComponentContent)
    },
    renderContentKey: (
      customContentRender: ComputedRef<Record<string, any>>
    ) => {
      return computed(() => {
        return Object.keys(customContentRender.value)
      })
    }
  }

  const getItemApiConfig = (schemaItem?: BaseFormApiFnType) =>
    baseFormApiFn(schemaItem)

  return { componentContent, componentField, getItemApiConfig }
}
