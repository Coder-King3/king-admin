import type { ElForm } from 'element-plus'

import type { FormSchema, KingFormProps } from './types'

import type { Recordable } from '@/types'

import {
  computed,
  type ComputedRef,
  readonly,
  ref,
  type Ref,
  toRaw,
  unref,
  watch
} from 'vue'

import { bindMethods, createMerge, isObject, mapArrayToObject } from '@/utils'

import { FormHandler } from './form-handler'

type FilterCondition = (key: string) => boolean
type FormInstance = InstanceType<typeof ElForm>
type ValidateCallbackFn = (valid: boolean, fields?: Recordable) => void

function getStateValues(schema: FormSchema[] = []) {
  return mapArrayToObject(schema, 'fieldName', 'defaultValue')
}

function setDefaultOptions(options: KingFormProps) {
  const defaultOptions: Partial<KingFormProps> = {
    commonConfig: {},
    handleReset: undefined,
    handleValuesChange: undefined,
    layout: 'vertical',
    schema: []
  }

  for (const key in defaultOptions) {
    const typedKey = key as keyof KingFormProps // 将 key 显式断言为合法属性
    if (!options?.[typedKey]) {
      options[typedKey] = defaultOptions[typedKey] as any
    }
  }
}

const fieldMergeFn = createMerge((obj, key, value) => {
  if (key in obj) {
    obj[key] =
      !Array.isArray(obj[key]) && isObject(obj[key])
        ? fieldMergeFn(obj[key], value)
        : value
  }
  return true
})

function valuesFilterFn(
  values: Recordable,
  filters: string[],
  condition: FilterCondition
) {
  return filters.reduce((result, field) => {
    if (condition(field)) {
      result[field] = values[field]
    }
    return result
  }, {} as Recordable)
}

class FormApi {
  isMounted = false
  formHandler: FormHandler

  // Form Component Instance
  private form = {} as FormInstance

  // Form Options
  private options: ComputedRef<KingFormProps>

  // Form Model
  private state: Ref<Recordable>

  constructor(options: KingFormProps) {
    setDefaultOptions(options)

    this.options = computed(() => options)

    this.state = ref(getStateValues(this.options.value?.schema))
    this.onStateChange()

    this.formHandler = new FormHandler()

    bindMethods(this)
  }

  async getForm() {
    if (!this.isMounted) {
      // 等待form挂载
      await this.formHandler.waitForCondition()
    }

    return unref(this.form)
  }

  getOptions() {
    return computed(() => unref(this.options))
  }
  getState() {
    return readonly(this.state)
  }

  getValues(fields?: string[], isExclude: boolean = false) {
    const values = toRaw(unref(this.state))
    if (!fields) return values

    let filterFields = [] as Recordable

    if (isExclude) {
      filterFields = valuesFilterFn(
        values,
        Object.keys(values),
        (field) => !fields.includes(field)
      )
    } else {
      filterFields = valuesFilterFn(values, fields, (field) => field in values)
    }

    return filterFields
  }

  setValues(fields: Record<string, any>, filterFields: boolean = true) {
    if (!filterFields) {
      this.state.value = fields
      return
    }

    const filteredFields = fieldMergeFn(fields, this.getValues())
    this.state.value = filteredFields
  }

  /**
   * 重置表单
   */
  async resetForm() {
    const form = await this.getForm()
    form?.resetFields?.()
    this.state.value = getStateValues(this.options.value?.schema)
    this.options.value?.handleReset?.(this.getValues())
  }

  getFieldValue(field: string) {
    return computed(() => this.state.value[field])
  }

  setFieldValue(field: string, value: any) {
    Reflect.set(this.state.value, field, value)
  }

  setState(schema: FormSchema[] = []) {
    this.state.value = getStateValues(schema)
  }

  mount(formRef: FormInstance) {
    if (!this.isMounted) {
      this.form = formRef
      this.formHandler.setConditionTrue()
      this.isMounted = true
    }
  }

  unmount() {
    this.form?.resetFields?.()
    this.state.value = {}
    this.isMounted = false
    this.formHandler.reset()
  }

  onStateChange() {
    const { handleValuesChange } = this.options.value
    if (handleValuesChange) {
      watch(
        () => this.state,
        (values) => {
          if (handleValuesChange) handleValuesChange?.(values)
        },
        { deep: true }
      )
    }
  }

  /**
   * 表单校验
   */
  async validate(validateCallback?: ValidateCallbackFn, field?: string) {
    const form = await this.getForm()

    const defaultCallback = (valid: boolean, fields?: Recordable) => {
      // 通过校验就返回，不打印错误信息
      if (valid) return

      const error: Record<string, string[]> = {}
      for (const key in fields) {
        if (fields[key]?.length > 0) {
          error[key] = fields[key]?.[0]?.message
        }
      }

      console.error('validate error', error)
    }

    const callback = validateCallback ?? defaultCallback

    const validateResult = field
      ? form.validateField(field, callback)
      : form.validate(callback)

    return validateResult
  }
}

type FormApiInstance = InstanceType<typeof FormApi>

export type { FormApiInstance, FormInstance }
export { FormApi }
