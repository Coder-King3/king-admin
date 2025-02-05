import type { App } from 'vue'

import { SliderCaptcha } from './captcha'
import { InputPassword } from './input-password'
import { RenderContent } from './render-content'
import { KingScrollbar } from './scrollbar'
import { Select } from './select'
import { SpineText } from './spine-text'
import { IconButton, SvgIcon } from './svg-icon'

// 注册公共组件
const BaseUI: any[] = [SvgIcon, InputPassword, IconButton]

/* 使用组件前缀 */
// const BaseUIPrefix = 'King'
export const registerBaseUI = (app: App) => {
  for (const component of BaseUI) {
    app.component(component.name, component)
    // app.component(BaseUIPrefix + component.name, component)
  }
}

export {
  IconButton,
  InputPassword,
  KingScrollbar,
  RenderContent,
  Select,
  SliderCaptcha,
  SpineText,
  SvgIcon
}
