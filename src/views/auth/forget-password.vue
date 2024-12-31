<script setup lang="ts">
import { useRouter } from 'vue-router'
import { $t } from '@/locales'
import { useKingForm } from '@/components'
import { AuthTitle } from '@/layouts/authentication'
import { z, zodValidator } from '@/utils'
const router = useRouter()

defineOptions({ name: 'ForgetPassword' })

const [Form, formApi] = useKingForm({
  formProps: {
    showMessage: false
  },
  commonConfig: {
    hideLabel: true,
    formItemProps: {
      class: 'mb-6'
    },
    componentProps: {
      class: 'h-10'
    }
  },
  schema: [
    {
      component: 'Input',
      componentProps: {
        placeholder: 'example@example.com'
      },
      fieldName: 'email',
      defaultValue: '',
      label: $t('auth.email'),
      rules: {
        trigger: 'change',
        validator: zodValidator(
          z
            .string()
            .min(1, { message: $t('auth.emailTip') })
            .email($t('auth.emailValidErrorTip'))
        )
      }
    }
  ]
})

async function handleResetLink() {
  const result = await formApi.validate()
  console.log(`result:`, result)
}
</script>

<template>
  <div>
    <AuthTitle>
      {{ `${$t('auth.forgetPassword')} 🤦🏻‍♂️ ` }}
      <template #desc>
        <span class="text-muted-foreground">
          {{ $t('auth.forgetPasswordSubtitle') }}
        </span>
      </template>
    </AuthTitle>

    <Form></Form>

    <ElButton type="primary" class="w-full h-9 mb-4" @click="handleResetLink">
      {{ $t('auth.sendResetLink') }}
    </ElButton>

    <ElButton text default class="w-full h-9" @click="() => router.go(-1)">
      {{ $t('common.back') }}
    </ElButton>
  </div>
</template>

<style lang="scss" scoped></style>
