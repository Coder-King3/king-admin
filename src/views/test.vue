<script setup lang="ts">
import type { BasicOption } from '@/types'

import { markRaw, ref } from 'vue'

import { loginApi, logoutApi } from '@/api'
import { SliderCaptcha } from '@/baseui'
import { type KingFormProps, ThemeToggle, useKingForm } from '@/components'
import { $t } from '@/locales'

import { ElMessage, ElNotification, ElRate as Rate } from 'element-plus'

defineOptions({ name: 'Test' })

/* function-doms */
// api-Test
const loginTest = async () => {
  console.log(`login test start~`)
  const testFormData = { password: '123', username: 'admin' }

  try {
    const result = await loginApi(testFormData)
    console.log(`result111:`, result)
  } catch (error) {
    console.log(`error:`, error)
  }
}
const logoutTest = async () => {
  const result = await logoutApi()
  console.log(`result:`, result)
}

const handleTestMessage = () => {
  ElMessage.success({
    duration: 0,
    message: 'Centered text',
    showClose: true
    // plain: true
  })

  ElNotification.success({
    duration: 0,
    message: '666'
  })
}

const value2 = ref(0)

/* form-doms */
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

const formOptions: KingFormProps = {
  commonConfig: {
    hideLabel: true
  },
  schema: [
    {
      component: 'Select',
      componentProps: (_value, form) => ({
        class: 'h-10',
        onChange: (value: string) => {
          const findUser = MOCK_USER_OPTIONS.find(
            (item) => item.value === value
          )
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
      formItemProps: {
        class: 'mb-6'
      },
      label: $t('auth.selectAccount')
    },
    {
      component: 'Input',
      componentProps: {
        class: 'h-10',
        placeholder: $t('auth.usernameTip')
      },
      defaultValue: 'king',
      fieldName: 'username',
      formItemProps: {
        class: 'mb-6'
      },
      label: $t('auth.usernameTip')
    },
    {
      component: 'InputPassword',
      componentProps: {
        class: 'h-10',
        placeholder: $t('auth.password')
      },
      defaultValue: '123456',
      fieldName: 'password',
      formItemProps: {
        class: 'mb-6'
      },
      label: $t('auth.password')
    },
    {
      component: markRaw(SliderCaptcha),
      fieldName: 'captcha'
    }
  ]
}

const [Form, formApi] = useKingForm(formOptions)

const logForm = async () => {
  console.log(`form-values:`, formApi.getValues())
}
</script>

<template>
  <div class="min-h-full">
    <div class="icon-doms m-2">
      <h3>icon-doms</h3>
      <div class="mb-6">
        <div icon-mdi:home></div>
        <div class="icon-lucide:activity h-3em w-3em"></div>
        <div icon-svg:vue-logo></div>
        <div icon-svg:logo></div>
        <div icon-svg:logo class="h-1.8em w-1.8em"></div>
        <SvgIcon icon="mdi:account-box-multiple-outline" />
        <SvgIcon icon="svg:logo" />
        <SvgIcon icon="svg:vue-logo" />
        <SvgIcon icon="solar:moon-bold" />
        <ElButton type="primary" round>Login</ElButton>
        <div>
          logo
          <div
            icon-svg:logo
            class="h-3em w-3em text-blue dark:text-orange"
          ></div>
        </div>
        <!-- <IconButton>
          <SvgIcon icon="solar:sun-2-bold"></SvgIcon>
        </IconButton> -->
        <ThemeToggle />
      </div>
    </div>

    <div class="function-doms m-2">
      <h3>function-doms</h3>
      <div class="mb-6 flex gap-2">
        <ElButton type="primary" @click="loginTest">loginSubmitTest</ElButton>
        <ElButton type="primary" @click="logoutTest">logoutSubmitTest</ElButton>
        <ElButton
          class="flex items-center rounded rounded-2xl rounded-3xl rounded-full rounded-lg rounded-md rounded-none rounded-sm rounded-xl !b-1-#000"
          type="primary"
          @click="handleTestMessage"
        >
          handleTestMessage
        </ElButton>
        <!-- float 5s linear 0ms infinite -->
        <!-- class="animation-float" -->
        <Rate
          style="animation: float 5s linear 0ms infinite"
          v-model="value2"
          :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
        />
      </div>
    </div>

    <div class="button-doms m-2">
      <h3>button-doms</h3>
      <div class="mb-6 flex flex-wrap gap-3">
        <ElButton>Default</ElButton>
        <ElButton type="primary">Primary</ElButton>
        <ElButton type="success">Success</ElButton>
        <ElButton type="warning">Warning</ElButton>
        <ElButton type="danger">Danger</ElButton>
        <ElButton type="info">Info</ElButton>
        <ElButton text>Default Text</ElButton>
        <ElButton text type="primary">Primary Text</ElButton>
        <ElButton text type="success">Success Text</ElButton>
        <ElButton text type="warning">Warning Text</ElButton>
        <ElButton text type="danger">Danger Text</ElButton>
        <ElButton text type="info">Info Text</ElButton>
      </div>
    </div>
    <div class="form-doms m-2">
      <h3>form-doms</h3>
      <p>test-form</p>
      <!-- <KingForm v-bind="formProps"></KingForm> -->
      <p>king-form</p>
      <Form />

      <ElButton type="primary" @click="logForm">log-form</ElButton>
    </div>
  </div>
</template>
