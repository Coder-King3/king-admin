import type { App } from 'vue'

import { SvgIcon, IconButton } from './svg-icon'
import { Select } from './select'
import { InputPassword } from './input-password'
import { SliderCaptcha } from './captcha'
import { SpineText } from './spine-text'
import { RenderContent } from './render-content'

// 注册公共组件
const BaseUI: any[] = [SvgIcon, InputPassword, IconButton]

/* 使用组件前缀 */
// const BaseUIPrefix = 'King'
const registerBaseUI = (app: App) => {
  for (const component of BaseUI) {
    app.component(component.name, component)
    // app.component(BaseUIPrefix + component.name, component)
  }
}

export {
  //导出组件注册函数
  registerBaseUI,
  // 导出组件
  SvgIcon,
  IconButton,
  InputPassword,
  SliderCaptcha,
  SpineText,
  Select,
  RenderContent
}
