<script setup lang="ts">
import { useRouter } from 'vue-router'
import { AuthTitle } from '@/layouts/authentication'
import { useKingForm } from '@/components'
import { $t } from '@/locales'
import { h } from 'vue'
import { z, zodParse, zodValidator, callbackReturn } from '@/utils'

defineOptions({ name: 'Register' })

const router = useRouter()

const [Form, formApi] = useKingForm({
  formProps: {
    showMessage: false
  },
  commonConfig: {
    hideLabel: true,
    formItemProps: { class: 'mb-6' },
    componentProps: { class: 'h-10' }
  },
  schema: [
    {
      component: 'Input',
      componentProps: {
        placeholder: $t('auth.usernameTip')
      },
      fieldName: 'username',
      label: $t('auth.username'),
      rules: {
        trigger: 'change',
        validator: zodValidator(
          z.string().min(1, { message: $t('auth.usernameTip') })
        )
      }
    },
    {
      component: 'InputPassword',
      componentProps: {
        placeholder: $t('auth.password'),
        passwordStrength: true
      },
      fieldName: 'password',
      label: $t('auth.password'),
      renderComponentContent() {
        return {
          strengthText: () => $t('auth.passwordStrength')
        }
      },
      rules: {
        trigger: 'change',
        validator: zodValidator(
          z.string().min(1, { message: $t('auth.passwordTip') })
        )
      }
    },
    {
      component: 'InputPassword',
      componentProps: {
        placeholder: $t('auth.confirmPassword')
      },
      fieldName: 'confirmPassword',
      label: $t('auth.confirmPassword'),
      rules: {
        trigger: 'change',
        validator: (_, confirmPassword, callback) => {
          const { password } = formApi.getValues(['password'])

          const { success, message } = zodParse(
            z
              .string({ required_error: $t('auth.passwordTip') })
              .min(1, { message: $t('auth.passwordTip') })
              .refine((value) => value === password, {
                message: $t('auth.confirmPasswordTip')
              }),
            confirmPassword
          )

          callbackReturn(callback, { success, message })
        }
      }
    },
    {
      component: 'Checkbox',
      fieldName: 'agreePolicy',
      defaultValue: false,
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
      rules: {
        trigger: 'change',
        validator: zodValidator(
          z.boolean().refine((value) => !!value, {
            message: $t('auth.agreeTip')
          })
        )
      },
      formItemProps: { class: 'mb-4 ' },
      componentProps: { class: 'h-8' }
    }
  ]
})

function handleGo(path: string) {
  router.push(path)
}

async function handleRegister() {
  const valid = await formApi.validate()
  console.log(`valid:`, valid)
}
</script>
``
<template>
  <div>
    <AuthTitle>
      {{ `${$t('auth.createAnAccount')} 🚀` }}
      <template #desc>
        <span class="text-muted-foreground">{{
          $t('auth.signUpSubtitle')
        }}</span>
      </template>
    </AuthTitle>

    <Form></Form>

    <ElButton type="primary" class="w-full h-9" @click="handleRegister">
      {{ $t('auth.signUp') }}
    </ElButton>

    <div class="mt-4 text-center text-sm flex-center">
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
