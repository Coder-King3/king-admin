import type { BaseFormComponentType } from './types'

import { type Component } from 'vue'

import { KingInputPassword, KingSelect } from '@baseui'

import { ElCheckbox, ElInput } from 'element-plus'

const componentMap = new Map<BaseFormComponentType, Component>()

function add(name: BaseFormComponentType, component: Component) {
  componentMap.set(name, component)
}

function remove(name: BaseFormComponentType) {
  componentMap.delete(name)
}

// initComponentMap
const defaultComponents = [
  {
    component: ElInput,
    name: 'Input'
  },
  {
    component: ElCheckbox,
    name: 'Checkbox'
  },
  {
    component: KingInputPassword,
    name: 'InputPassword'
  },
  {
    component: KingSelect,
    name: 'Select'
  }
]
defaultComponents.forEach(({ component, name }) => {
  add(name, component)
})

export { add, componentMap, remove }
