import type { Component } from 'vue'
import type { FormApiInstance } from './form-api'
import type { FormItemRule } from 'element-plus'

export type FormLayout = 'horizontal' | 'vertical'

export type BaseFormComponentType =
  | 'Input'
  | 'InputPassword'
  | 'Select'
  | (Record<never, never> & string)

export type HandleSubmitFn = (
  values: Record<string, any>
) => Promise<void> | void

export type HandleResetFn = (
  values: Record<string, any>
) => Promise<void> | void

export interface FormCommonConfig {
  /** 所有表单项的禁用状态 */
  hideLabel?: boolean

  /** 隐藏所有表单项label */
  disabled?: boolean

  /** 所有表单项的共用参数 */
  formItemProps?: Recordable

  /** 所有组件的共用参数 */
  componentProps?: Recordable
}

export type RenderComponentContentType = (
  value: Partial<Record<string, any>>,
  api: FormApiInstance
) => Record<string, any>

type FormRuleType = FormItemRule | FormItemRule[]

export interface FormSchema extends FormCommonConfig {
  /** 组件 */
  component: Component | BaseFormComponentType
  /** 组件参数 */
  componentProps?: Recordable
  /** 默认值 */
  defaultValue?: any
  /** 依赖 */
  // dependencies?: FormItemDependencies;
  /** 字段名 */
  fieldName: string
  /** 表单项 */
  label?: string
  // 自定义组件内部渲染
  renderComponentContent?: RenderComponentContentType
  /** 字段规则 - (参考 element-plus 文档) */
  rules?: FormRuleType
  /** 表单项参数 - (参考 element-plus 文档) */
  formItemProps?: Omit<Recordable, 'prop' | 'label' | 'rules'>
}

export interface FormRenderProps {
  /** 表单定义 */
  schema?: FormSchema[]
  /** 表单项布局 */
  layout?: FormLayout
  /** 表单规则 - (参考 element-plus 文档) */
  rules?: Recordable<FormRuleType>
  /** 表单参数 - (参考 element-plus 文档) */
  formProps?: Omit<Recordable, 'rules' | 'inline' | 'layout' | 'model'>
  /** 表单项通用后备配置，当子项目没配置时使用这里的配置，子项目配置优先级高于此配置 */
  commonConfig?: FormCommonConfig
}

export interface KingFormProps extends FormRenderProps {
  /** 表单重置回调 */
  handleReset?: HandleResetFn
  /** 表单提交回调 */
  handleSubmit?: HandleSubmitFn
  /** 表单值变化回调 */
  handleValuesChange?: (values: Record<string, any>) => void
  /** 是否在字段值改变时提交表单 */
  submitOnChange?: boolean
  /** 是否在回车时提交表单 */
  submitOnEnter?: boolean
}
