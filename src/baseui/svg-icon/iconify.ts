import { defineComponent, h } from 'vue'

import { Icon } from '@iconify/vue'

function createIfyIcon(icon: string) {
  return defineComponent({
    name: `icon-${icon}`,
    setup(props, { attrs }) {
      return () => h(Icon, { icon, ...props, ...attrs })
    }
  })
}

export { createIfyIcon }
export type { IconifyIcon as IconifyIconStructure } from '@iconify/vue'
export {
  addCollection,
  addIcon,
  Icon as IconifyIcon,
  listIcons
} from '@iconify/vue'
