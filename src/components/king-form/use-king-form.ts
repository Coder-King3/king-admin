import type { KingFormProps } from './types'

import { defineComponent, h, isReactive, onBeforeUnmount, watch } from 'vue'

import { FormApi, type FormApiInstance } from './form-api'
import { Form as KingForm } from './form-render'

export function useKingForm(options: KingFormProps): [
  ReturnType<typeof defineComponent>, // 表示返回的组件类型
  FormApiInstance // 表示扩展的 API 类型
] {
  const IS_REACTIVE = isReactive(options)
  const formApi = new FormApi(options) as FormApiInstance

  const Form = defineComponent(
    (props: KingFormProps, { attrs, slots }) => {
      onBeforeUnmount(() => {
        formApi.unmount()
      })
      return () => h(KingForm, { ...props, ...attrs, formApi }, slots)
    },
    {
      name: 'KingUseForm',
      // eslint-disable-next-line perfectionist/sort-objects
      inheritAttrs: false
    }
  )
  // Add reactivity support
  if (IS_REACTIVE) {
    watch(
      () => options.schema,
      () => {
        formApi.setState(options.schema)
      },
      { immediate: true }
    )
  }

  return [Form, formApi]
}
