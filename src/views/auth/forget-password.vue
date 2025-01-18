<script setup lang="ts">
import { useRouter } from 'vue-router'

import { useKingForm } from '@/components'
import { LOGIN_PATH } from '@/constants'
import { AuthTitle } from '@/layouts/authentication'
import { $t } from '@/locales'
import { validation } from '@/utils'

import { z } from 'zod'

defineOptions({ name: 'ForgetPassword' })

const router = useRouter()

const [Form, formApi] = useKingForm({
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
    showMessage: false
  },
  schema: [
    {
      component: 'Input',
      componentProps: {
        placeholder: 'example@example.com'
      },
      defaultValue: '',
      fieldName: 'email',
      label: $t('auth.email'),
      rules() {
        const ruleParams = { message: $t('auth.emailTip') }
        return {
          trigger: 'change',
          validator: validation(
            z
              .string(ruleParams)
              .min(1, ruleParams)
              .email($t('auth.emailValidErrorTip'))
          )
        }
      }
    }
  ]
})

function goToLogin() {
  router.push(LOGIN_PATH)
}

async function handleResetLink() {
  const valid = await formApi.validate()
  if (!valid) return

  // eslint-disable-next-line no-console
  console.log(`Send resetPassword link`)
  // eslint-disable-next-line no-console
  console.log(`Email Info`, formApi.getValues())
}
</script>

<template>
  <div>
    <AuthTitle>
      {{ `${$t('auth.forgetPassword')} 🤦🏻‍♂️ ` }}
      <template #desc>
        {{ $t('auth.forgetPasswordSubtitle') }}
      </template>
    </AuthTitle>

    <Form />

    <ElButton type="primary" class="mb-4 h-9 w-full" @click="handleResetLink">
      {{ $t('auth.sendResetLink') }}
    </ElButton>

    <ElButton text default class="h-9 w-full shadow-sm" @click="goToLogin">
      {{ $t('common.back') }}
    </ElButton>
  </div>
</template>

<style lang="scss" scoped></style>
