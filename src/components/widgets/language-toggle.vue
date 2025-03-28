<script setup lang="ts">
import { toRefs } from 'vue'

import { KingIcon, KingIconButton } from '@baseui'
import { preferences, updatePreferences } from '@preferences'

import { SUPPORT_LANGUAGES } from '@/constants'
import { loadLocaleMessages, type SupportedLanguagesType } from '@/locales'

interface Props {
  /**
   * 类型
   */
  type?: 'icon' | 'normal'
}

defineOptions({ name: 'LanguageToggle' })

const props = withDefaults(defineProps<Props>(), {
  type: 'normal'
})

const { type } = toRefs(props)

async function handleUpdate(value: SupportedLanguagesType) {
  const locale = value as SupportedLanguagesType

  updatePreferences({
    app: {
      locale
    }
  })

  await loadLocaleMessages(locale)
}
</script>

<template>
  <ElDropdown trigger="click" @command="handleUpdate">
    <KingIconButton :type="type">
      <KingIcon icon="lucide:languages" />
    </KingIconButton>
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem
          v-for="item in SUPPORT_LANGUAGES"
          :key="item.value"
          :command="item.value"
          :active="item.value === preferences.app.locale"
        >
          {{ item.label }}
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>

<style lang="scss" scoped></style>
