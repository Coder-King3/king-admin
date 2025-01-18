export type BaseFormComponentType =
  | 'Cascader'
  | 'CheckboxGroup'
  | 'DatePicker'
  | 'Divider'
  | 'Input'
  | 'Input'
  | 'InputNumber'
  | 'PrimaryButton'
  | 'RadioGroup'
  | 'Rate'
  | 'Select'
  | 'Slider'
  | 'Switch'
  | 'TimePicker'
  | 'TimeSelect'
  | 'Upload'
  | 'VbenCheckbox'
  | 'VbenInput'
  | 'VbenInputPassword'
  | 'VbenPinInput'
  | 'VbenSelect'

interface PeopleInfo {
  name: string
  role: '恋人' | '朋友'
  sex: '女' | '男'
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

const LiuYiFei = new People({ name: '刘亦菲', role: '恋人', sex: '女' })
LiuYiFei.hello('King')

export {
  ElAvatar as Avatar,
  ElBadge as Badge,
  ElButton as Button,
  ElCard as Card,
  ElCheckbox as Checkbox,
  ElForm as Form,
  ElImage as Image,
  ElInput as Input,
  ElLink as Link,
  ElOption as Option,
  ElPagination as Pagination,
  ElRadio as Radio,
  ElSelect as Select,
  ElSwitch as Switch,
  ElTabs as Tabs,
  ElTooltip as Tooltip
} from 'element-plus'
