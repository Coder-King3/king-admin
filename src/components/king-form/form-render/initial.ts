import { computed, useSlots } from 'vue'
import type { KingFormProps } from '../types'

// 表单模式(默认垂直)：水平表单(horizontal)|垂直表单(vertical)
export const computedLayoutMode = (options: KingFormProps) => {
  return computed(() => {
    let inline = false
    switch (options.layout) {
      case 'horizontal': {
        inline = true
        break
      }
      case 'vertical': {
        inline = false
        break
      }
    }
    return inline
  })
}

export function useFormInitial(options: KingFormProps) {
  const slots = useSlots()

  const delegatedSlots = computed(() => {
    const resultSlots: string[] = []

    for (const key of Object.keys(slots)) {
      if (key !== 'default') {
        resultSlots.push(key)
      }
    }
    return resultSlots
  })

  const isHorizontal = computedLayoutMode(options)

  return { delegatedSlots, isHorizontal }
}
