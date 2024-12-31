import { computed, type ComputedRef } from 'vue'
import type { RenderComponentContentType } from '../types'
import type { FormApiInstance } from '../form-api'
import { isFunction } from '@/utils'

export const useFormHelper = (formApi: FormApiInstance) => {
  const componentField = {
    fieldValue: (fieldName: string) => formApi.getFieldValue(fieldName),
    setFieldValue: (filed: string, value: any) =>
      formApi.setFieldValue(filed, value)
  }

  const componentContent = {
    customContentRender: (
      renderComponentContent?: RenderComponentContentType
    ) => {
      return computed(() => {
        if (!isFunction(renderComponentContent)) {
          return {}
        }
        return renderComponentContent(formApi.getValues(), formApi)
      })
    },
    renderContentKey: (
      customContentRender: ComputedRef<Record<string, any>>
    ) => {
      return computed(() => {
        return Object.keys(customContentRender.value)
      })
    }
  }

  return { componentField, componentContent }
}
