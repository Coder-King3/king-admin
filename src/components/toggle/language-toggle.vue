<script setup lang="ts">
import { SUPPORT_LANGUAGES } from '@/constants'
import { storeToRefs, useGlobalStore } from '@/store'
import { loadLocaleMessages, type SupportedLanguagesType } from '@/locales'

defineOptions({ name: 'LanguageToggle' })

const globalStore = useGlobalStore()
const { locale } = storeToRefs(globalStore)
const { setGlobalState } = globalStore

async function handleUpdate(value: SupportedLanguagesType) {
  const locale = value as SupportedLanguagesType
  console.log(`locale:`, locale)
  setGlobalState('locale', locale)

  await loadLocaleMessages(locale)
}
</script>

<template>
  <ElDropdown trigger="click" @command="handleUpdate">
    <IconButton>
      <SvgIcon icon="lucide:languages"></SvgIcon>
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
