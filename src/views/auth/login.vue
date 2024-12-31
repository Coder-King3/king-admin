<script setup lang="ts">
import { markRaw, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { SliderCaptcha } from '@/baseui/captcha'
import { AuthTitle } from '@/layouts/authentication'
import { useKingForm } from '@/components'
import { $t } from '@/locales'
import { isEmpty, isString, localCache, zodValidator } from '@/utils'
import { z } from 'zod'

defineOptions({ name: 'Login' })

const router = useRouter()

function handleGo(path: string) {
  router.push(path)
}

const REMEMBER_ME_KEY = `REMEMBER_ME_USERNAME_${location.hostname}`
const localUsername = localCache.getCache(REMEMBER_ME_KEY) || ''

const rememberMe = ref(isEmpty(localUsername))

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
      component: 'Select',
      componentProps: {
        options: MOCK_USER_OPTIONS,
        placeholder: $t('auth.selectAccount'),
        showLabel: true,
        onChange: (value: string) => {
          const findUser = MOCK_USER_OPTIONS.find(
            (item) => item.value === value
          )
          if (findUser) {
            formApi.setValues({
              password: '123456',
              username: findUser.value
            })
          }
        }
      },
      fieldName: 'selectAccount',
      defaultValue: 'king',
      label: $t('auth.selectAccount')
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: $t('auth.usernameTip')
      },
      fieldName: 'username',
      defaultValue: 'king',
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
        placeholder: $t('auth.password')
      },
      fieldName: 'password',
      defaultValue: '123456',
      label: $t('auth.password'),
      rules: {
        trigger: 'change',
        validator: zodValidator(
          z.string().min(1, { message: $t('auth.passwordTip') })
        )
      }
    },
    {
      component: markRaw(SliderCaptcha),
      fieldName: 'captcha',
      defaultValue: false,
      rules: {
        trigger: 'change',
        validator: zodValidator(
          z.boolean().refine((value) => !!value, {
            message: $t('auth.verifyRequiredTip')
          })
        )
      }
    }
  ]
})

onMounted(() => {
  if (rememberMe.value) {
    formApi.setValues({
      selectAccount: localUsername,
      username: localUsername
    })
  }
})

async function handleSubmit() {
  const valid = await formApi.validate()
  if (!valid) return

  const values = await formApi.getValues()
  localCache.setCache(REMEMBER_ME_KEY, rememberMe.value ? values?.username : '')
}
</script>

<template>
  <div>
    <AuthTitle>
      {{ `${$t('auth.welcome')} 👋🏻` }}
      <template #desc>
        <span class="text-muted-foreground">
          {{ $t('auth.signInSubtitle') }}
        </span>
      </template>
    </AuthTitle>

    <Form></Form>

    <div class="mb-4 flex justify-between items-center">
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

    <ElButton type="primary" class="w-full h-9" @click="handleSubmit">
      {{ $t('auth.signIn') }}
    </ElButton>

    <div class="mt-4 text-center text-sm flex-center">
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

<style lang="scss" scoped></style>
