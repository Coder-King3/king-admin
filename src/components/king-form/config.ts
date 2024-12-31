import { type Component } from 'vue'
import type { BaseFormComponentType } from './types'
// import { ElInput,ElCheckbox } from 'element-plus'
import { InputPassword, Select } from '@/baseui'
import { Input, Checkbox } from '@/baseui/ep'

const componentMap = new Map<BaseFormComponentType, Component>()

componentMap.set('Input', Input)
componentMap.set('Checkbox', Checkbox)
// componentMap.set('Input',markRaw(ElInput))
// componentMap.set('Checkbox', markRaw(ElCheckbox))
componentMap.set('InputPassword', InputPassword)
componentMap.set('Select', Select)

export function add(name: BaseFormComponentType, component: Component) {
  componentMap.set(name, component)
}

export function del(name: BaseFormComponentType) {
  componentMap.delete(name)
}

export { componentMap }
