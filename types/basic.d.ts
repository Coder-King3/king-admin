interface BasicOption {
  label: string
  value: string
}

type ClassType = Array<object | string> | object | string

type SelectOption = BasicOption

type TabOption = BasicOption

export type { BasicOption, ClassType, SelectOption, TabOption }
