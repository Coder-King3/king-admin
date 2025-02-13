<script setup lang="ts">
import { h } from 'vue'
import { useRouter } from 'vue-router'

import { useKingForm } from '@/components'
import { AuthTitle } from '@/layouts/authentication'
import { $t } from '@/locales'
import { callbackReturn, ruleParse, validation } from '@/utils'

import { z } from 'zod'

defineOptions({ name: 'Register' })

const router = useRouter()

const [Form, formApi] = useKingForm({
  commonConfig: {
    componentProps: { class: 'h-10' },
    formItemProps: { class: 'mb-6' },
    hideLabel: true
  },
  formProps: {
    showMessage: false
  },
  schema: [
    {
      component: 'Input',
      componentProps: {
        placeholder: $t('auth.usernameTip')
      },
      fieldName: 'username',
      label: $t('auth.username'),
      rules: validation(z.string().min(1, { message: $t('auth.usernameTip') }))
    },
    {
      component: 'InputPassword',
      componentProps: {
        passwordStrength: true,
        placeholder: $t('auth.password')
      },
      fieldName: 'password',
      label: $t('auth.password'),
      renderComponentContent() {
        return {
          strengthText: () => $t('auth.passwordStrength')
        }
      },
      rules: validation(z.string().min(1, { message: $t('auth.passwordTip') }))
    },
    {
      component: 'InputPassword',
      componentProps: {
        placeholder: $t('auth.confirmPassword')
      },
      fieldName: 'confirmPassword',
      label: $t('auth.confirmPassword'),
      rules: (_values, form) =>
        validation((_, confirmPassword, callback) => {
          const { password } = form.getValues(['password'])

          const { message, success } = ruleParse(
            z
              .string({
                message: $t('auth.passwordTip', { code: true })
              })
              .min(1, { message: $t('auth.passwordTip', { code: true }) })
              .refine((value) => value === password, {
                message: $t('auth.confirmPasswordTip', { code: true })
              }),
            confirmPassword
          )

          callbackReturn(callback, { message, success })
        })
      // rules: (_values, form) =>
      //   ({
      //     trigger: 'change',
      //     validator: (_, confirmPassword, callback) => {
      //       const { password } = form.getValues(['password'])

      //       const { message, success } = ruleParse(
      //         z
      //           .string({
      //             message: $t('auth.passwordTip', { code: true })
      //           })
      //           .min(1, { message: $t('auth.passwordTip', { code: true }) })
      //           .refine((value) => value === password, {
      //             message: $t('auth.confirmPasswordTip', { code: true })
      //           }),
      //         confirmPassword
      //       )

      //       callbackReturn(callback, { message, success })
      //     }
      //   }) as KingFormRuleType
    },
    {
      component: 'Checkbox',
      componentProps: { class: 'h-8' },
      defaultValue: false,
      fieldName: 'agreePolicy',
      formItemProps: { class: 'mb-4 ' },
      renderComponentContent: () => ({
        default: () =>
          h('span', [
            $t('auth.agree'),
            h(
              'a',
              {
                class: 'king-link ml-1 ',
                href: ''
              },
              `${$t('auth.privacyPolicy')} & ${$t('auth.terms')}`
            )
          ])
      }),
      rules: validation(
        z.boolean().refine((value) => !!value, {
          message: $t('auth.agreeTip', { code: true })
        })
      )
    }
  ]
})

function handleGo(path: string) {
  router.push(path)
}

async function handleRegister() {
  const valid = await formApi.validate()
  if (!valid) return

  // eslint-disable-next-line no-console
  console.log(`register Account`)
  // eslint-disable-next-line no-console
  console.log(`Account Info`, formApi.getValues())
}
</script>
``
<template>
  <div>
    <AuthTitle>
      {{ `${$t('auth.createAnAccount')} 🚀` }}
      <template #desc>
        {{ $t('auth.signUpSubtitle') }}
      </template>
    </AuthTitle>

    <Form />

    <ElButton type="primary" class="h-9 w-full" @click="handleRegister">
      {{ $t('auth.signUp') }}
    </ElButton>

    <div class="mt-4 flex-center text-center text-sm">
      {{ $t('auth.alreadyHaveAccount') }}&nbsp;
      <ElLink
        @click="handleGo('/auth/login')"
        type="primary"
        :underline="false"
        class="text-sm font-normal"
      >
        {{ $t('auth.goToLogin') }}
      </ElLink>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
