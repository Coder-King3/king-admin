export type BaseFormComponentType =
  | 'Input'
  | 'PrimaryButton'
  | 'VbenCheckbox'
  | 'VbenInput'
  | 'VbenInputPassword'
  | 'VbenPinInput'
  | 'VbenSelect'
  | 'Input'
  | 'InputNumber'
  | 'Select'
  | 'RadioGroup'
  | 'CheckboxGroup'
  | 'Cascader'
  | 'DatePicker'
  | 'TimePicker'
  | 'TimeSelect'
  | 'Switch'
  | 'Upload'
  | 'Slider'
  | 'Rate'
  | 'Divider'

interface PeopleInfo {
  name: string
  sex: '男' | '女'
  role: '朋友' | '恋人'
}

class People {
  private peopleInfo: PeopleInfo

  constructor(peopleInfo: PeopleInfo) {
    this.peopleInfo = peopleInfo
  }

  hello(you: string) {
    const { name, role } = this.peopleInfo
    console.log(`你好，我是${you}的${role}，我叫${name}`)
  }
}

const LiuYiFei = new People({ name: '刘亦菲', sex: '女', role: '恋人' })
LiuYiFei.hello('King')

export {
  ElButton as Button,
  ElForm as Form,
  ElInput as Input,
  ElSelect as Select,
  ElOption as Option,
  ElPagination as Pagination,
  ElTooltip as Tooltip,
  ElSwitch as Switch,
  ElCheckbox as Checkbox,
  ElRadio as Radio,
  ElImage as Image,
  ElAvatar as Avatar,
  ElCard as Card,
  ElBadge as Badge,
  ElTabs as Tabs,
  ElLink as Link
} from 'element-plus'
