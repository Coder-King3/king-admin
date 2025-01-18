import type { ClassType } from '@/types'

import type { CSSProperties } from 'vue'

export interface CaptchaVerifyPassingData {
  isPassing: boolean
  time: number | string
}

export interface SliderCaptchaProps {
  /**
   * @description 滑块的样式
   * @default {}
   */
  actionStyle?: CSSProperties
  /**
   * @description 滑块条的样式
   * @default {}
   */
  barStyle?: CSSProperties

  class?: ClassType

  /**
   * @description 内容的样式
   * @default {}
   */
  contentStyle?: CSSProperties

  /**
   * @description 是否作为插槽使用，用于联动组件，可参考旋转校验组件
   * @default false
   */
  isSlot?: boolean

  /**
   * @description 验证成功的提示
   * @default '验证通过'
   */
  successText?: string

  /**
   * @description 提示文字
   * @default '请按住滑块拖动'
   */
  text?: string

  /**
   * @description 组件的样式
   * @default {}
   */
  wrapperStyle?: CSSProperties
}

export interface SliderRotateVerifyPassingData {
  event: MouseEvent | TouchEvent
  moveDistance: number
  moveX: number
}
