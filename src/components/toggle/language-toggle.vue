<script setup lang="ts">
import { SUPPORT_LANGUAGES } from '@/constants'
import { loadLocaleMessages, type SupportedLanguagesType } from '@/locales'
import { storeToRefs, useAppStore } from '@/store'

interface Props {
  /**
   * 类型
   */
  type?: 'icon' | 'normal'
}

defineOptions({ name: 'LanguageToggle' })

const props = withDefaults(defineProps<Props>(), {
  type: 'icon'
})

const appStore = useAppStore()
const { locale } = storeToRefs(appStore)
const { setAppState } = appStore

async function handleUpdate(value: SupportedLanguagesType) {
  const locale = value as SupportedLanguagesType

  setAppState('locale', locale)

  await loadLocaleMessages(locale)
}
</script>

<template>
  <ElDropdown trigger="click" @command="handleUpdate">
    <IconButton :type="props.type">
      <SvgIcon icon="lucide:languages" />
    </IconButton>
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem
          v-for="item in SUPPORT_LANGUAGES"
          :key="item.value"
          :command="item.value"
          :active="item.value === locale"
        >
          {{ item.label }}
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>

<style lang="scss" scoped></style>
