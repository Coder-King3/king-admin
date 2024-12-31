import { defineComponent, h, isReactive, watch } from 'vue'
import { Form as KingForm } from './form-render'
import type { KingFormProps } from './types'
import { onBeforeUnmount } from 'vue'
import { FormApi, type FormApiInstance } from './form-api'

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
      inheritAttrs: false,
      name: 'KingUseForm'
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