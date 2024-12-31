import { ref, unref, toRaw, type Ref, computed, watch } from 'vue'
import type { ElForm } from 'element-plus'
import type { FormSchema, KingFormProps } from './types'
import {
  bindMethods,
  createMerge,
  isObject,
  mapArrayToObject,
  StateHandler
} from '@/utils'

function getStateValues(schema: FormSchema[] = []) {
  return mapArrayToObject(schema, 'fieldName', 'defaultValue')
}

function getDefaultOptions(): KingFormProps {
  return {
    commonConfig: {},
    handleReset: undefined,
    handleValuesChange: undefined,
    layout: 'vertical',
    schema: []
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

export type FormApiInstance = InstanceType<typeof FormApi>
export type FormInstance = InstanceType<typeof ElForm>
type ValidateCallbackFn = (valid: boolean, fields?: Recordable) => void

export class FormApi {
  // Form Component Instance
  private form = {} as FormInstance
  isMounted = false

  // Form Model
  private state: Ref<Recordable>

  stateHandler: StateHandler

  // Form Options
  private options: Ref<KingFormProps>

  constructor(options: KingFormProps) {
    const { ...userOptions } = options
    const defaultOptions = getDefaultOptions()

    this.options = ref({
      ...defaultOptions,
      ...userOptions
    })

    this.state = ref(getStateValues(this.options.value?.schema))
    this.onStateChange()

    this.stateHandler = new StateHandler()

    bindMethods(this)
  }

  getOptions() {
    return computed(() => unref(this.options))
  }

  async getForm() {
    if (!this.isMounted) {
      // 等待form挂载
      await this.stateHandler.waitForCondition()
    }

    return unref(this.form)
  }

  getState() {
    return computed(() => unref(this.state))
  }
  setState(schema: FormSchema[] = []) {
    this.state.value = getStateValues(schema)
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

  getValues(fields?: string[]) {
    const values = toRaw(unref(this.state))
    if (!fields) return values

    const filterFields = fields.reduce(
      (result, field) => {
        if (field in values) {
          result[field] = values[field]
        }
        return result
      },
      {} as Record<string, any>
    )

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

  getFieldValue(field: string) {
    return computed(() => this.state.value[field])
  }

  setFieldValue(field: string, value: any) {
    Reflect.set(this.state.value, field, value)
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

  /**
   * 表单校验
   */
  async validate(validateCallback?: ValidateCallbackFn) {
    const form = await this.getForm()

    let defaultCallback = (valid: boolean, fields?: Recordable) => {
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

    let callback = validateCallback ?? defaultCallback

    return form.validate(callback)
  }

  mount(formRef: FormInstance) {
    if (!this.isMounted) {
      this.form = formRef
      this.stateHandler.setConditionTrue()
      this.isMounted = true
    }
  }

  unmount() {
    this.form?.resetFields?.()
    this.state.value = {}
    this.isMounted = false
    this.stateHandler.reset()
  }
}
