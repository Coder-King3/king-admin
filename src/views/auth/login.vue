<script setup lang="ts">
import type { BasicOption } from '@/types'

import { computed, markRaw, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import { KingSliderCaptcha } from '@/baseui'
import { type KingFormSchema, useKingForm } from '@/components'
import { AuthTitle } from '@/layouts'
import { $t } from '@/locales'
import { storeToRefs, useAuthStore } from '@/store'
import { isEmpty, localCache, validation } from '@/utils'

import { z } from 'zod'

defineOptions({ name: 'Login' })

const router = useRouter()
const authStore = useAuthStore()
const { loginLoading } = storeToRefs(authStore)
const { authLogin } = authStore

const REMEMBER_ME_KEY = `_REMEMBER_ME_USERNAME_${location.hostname}`
const localUsername = localCache.getItem(REMEMBER_ME_KEY) || ''
const rememberMe = ref(!isEmpty(localUsername))

const MOCK_USER_OPTIONS: BasicOption[] = [
  {
    label: 'Super',
    value: 'king'
  },
  {
    label: 'Admin',
    value: 'admin'
  },
  {
    label: 'User',
    value: 'ck'
  }
]

const formSchema = computed<KingFormSchema[]>(() => [
  {
    component: 'Select',
    componentProps: (_values, form) => ({
      onChange: (value: string) => {
        const findUser = MOCK_USER_OPTIONS.find((item) => item.value === value)
        if (findUser) {
          form.setValues({
            password: '123456',
            username: findUser.value
          })
        }
      },
      options: MOCK_USER_OPTIONS,
      placeholder: $t('auth.selectAccount'),
      showLabel: true
    }),
    defaultValue: 'king',
    fieldName: 'selectAccount',
    label: $t('auth.selectAccount')
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: $t('auth.usernameTip')
    },
    defaultValue: 'king',
    fieldName: 'username',
    label: $t('auth.username'),
    rules: validation(
      z
        .string({ message: $t('auth.usernameTip', { code: true }) })
        .min(1, { message: $t('auth.usernameTip', { code: true }) })
    )
  },
  {
    component: 'InputPassword',
    componentProps: {
      placeholder: $t('auth.password')
    },
    defaultValue: '123456',
    fieldName: 'password',
    label: $t('auth.password'),
    rules: validation(
      z.string().min(1, { message: $t('auth.passwordTip', { code: true }) })
    )
  },
  {
    component: markRaw(KingSliderCaptcha),
    componentProps: (_values, form) => ({
      onSuccess: async ({ isPassing }: { isPassing: boolean }) => {
        if (isPassing) await form.validate(undefined, 'captcha')
      }
    }),
    defaultValue: false,
    fieldName: 'captcha',
    rules: validation(
      z.boolean().refine((value) => !!value, {
        message: $t('auth.verifyRequiredTip', { code: true })
      })
    )
  }
])

const [Form, formApi] = useKingForm(
  reactive({
    commonConfig: {
      componentProps: {
        class: 'h-10'
      },
      formItemProps: {
        class: 'mb-6'
      },
      hideLabel: true
    },
    formProps: {
      // showMessage: false
    },
    schema: formSchema
  })
)

function handleGo(path: string) {
  router.push(path)
}

async function handleSubmit() {
  const valid = await formApi.validate()
  if (!valid) return

  const loginFrom = formApi.getValues(['username', 'password'])
  localCache.setItem(
    REMEMBER_ME_KEY,
    rememberMe.value ? loginFrom?.username : ''
  )

  // login action
  authLogin(loginFrom)
}

onMounted(() => {
  if (rememberMe.value) formApi.setFieldValue('selectAccount', localUsername)
})
</script>

<template>
  <div @keydown.enter.prevent="handleSubmit">
    <AuthTitle>
      {{ `${$t('auth.welcome')} 👋🏻` }}
      <template #desc>
        {{ $t('auth.signInSubtitle') }}
      </template>
    </AuthTitle>

    <Form />

    <div class="mb-4 flex items-center justify-between">
      <ElCheckbox v-model="rememberMe" :label="$t('auth.rememberMe')" />

      <ElLink
        @click="handleGo('/auth/forgetPassword')"
        type="primary"
        :underline="false"
        class="text-sm font-normal"
      >
        {{ $t('auth.forgetPassword') }}
      </ElLink>
    </div>

    <ElButton
      :loading="loginLoading"
      type="primary"
      class="h-9 w-full"
      @click="handleSubmit"
    >
      {{ $t('auth.signIn') }}
    </ElButton>

    <div class="mt-4 flex-center text-center text-sm">
      {{ $t('auth.accountTip') }}&nbsp;
      <ElLink
        @click="handleGo('/auth/register')"
        type="primary"
        :underline="false"
        class="text-sm font-normal"
      >
        {{ $t('auth.createAccount') }}
      </ElLink>
    </div>
  </div>
</template>
