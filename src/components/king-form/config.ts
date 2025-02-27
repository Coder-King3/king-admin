import type { BaseFormComponentType } from './types'

import { type Component } from 'vue'

import { KingInputPassword, KingSelect } from '@/baseui'

import { ElCheckbox, ElInput } from 'element-plus'

const componentMap = new Map<BaseFormComponentType, Component>()

componentMap.set('Input', ElInput)
componentMap.set('Checkbox', ElCheckbox)
componentMap.set('InputPassword', KingInputPassword)
componentMap.set('Select', KingSelect)

export function add(name: BaseFormComponentType, component: Component) {
  componentMap.set(name, component)
}

export function del(name: BaseFormComponentType) {
  componentMap.delete(name)
}

export { componentMap }
