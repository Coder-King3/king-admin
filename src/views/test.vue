<script setup lang="ts">
import { markRaw, nextTick, toRefs } from 'vue'
import { useGlobalStore } from '@/store'
import { localCache } from '@/utils'
import { loginApi, logoutApi } from '@/api'
import { type KingFormProps, useKingForm } from '@/components'
import { $t } from '@/locales'
import { SliderCaptcha } from '@/baseui'

defineOptions({ name: 'Test' })

const LOGIN_TOKEN = 'test_login'

const globalStore = useGlobalStore()
const { isDark } = toRefs(globalStore)
const { switchDark } = globalStore

/* function-doms */
// theme-toggle
const toggleTheme = async (event: MouseEvent) => {
  const isAppearanceTransition = document.startViewTransition
  if (!isAppearanceTransition || !event) {
    switchDark()
    return
  }
  // 以event的x/y坐标为中心画圆
  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y)
  )
  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${endRadius}px at ${x}px ${y}px)`
  ]

  // 改变isDark状态后开启动画
  const transition = document.startViewTransition(async () => {
    switchDark()
    await nextTick()
  })
  await transition.ready

  document.documentElement.animate(
    {
      clipPath: isDark.value ? [...clipPath].reverse() : clipPath
    },
    {
      duration: 350,
      easing: 'ease-in',
      pseudoElement: isDark.value
        ? '::view-transition-old(root)'
        : '::view-transition-new(root)'
    }
  )
}
// api-Test
const loginTest = async () => {
  const { result } = await loginApi({ username: 'admin', password: '123456' })
  localCache.setCache(LOGIN_TOKEN, result.token)
  console.log(`result:`, result)
}
const logoutTest = async () => {
  const result = await logoutApi()
  console.log(`result:`, result)
}

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
  schema: [
    {
      component: 'Select',
      fieldName: 'selectAccount',
      defaultValue: 'king',
      label: $t('auth.selectAccount'),
      componentProps: {
        class: 'h-10',
        options: MOCK_USER_OPTIONS,
        placeholder: $t('auth.selectAccount'),
        showLabel: true,
        onChange: (value: string) => {
          const findUser = MOCK_USER_OPTIONS.find(
            (item) => item.value === value
          )
          if (findUser) {
            extendedApi.setValues({
              password: '123456',
              username: findUser.value
            })
          }
        }
      },
      formItemProps: {
        class: 'mb-6'
      }
    },
    {
      component: 'Input',
      fieldName: 'username',
      defaultValue: 'king',
      label: $t('auth.usernameTip'),
      componentProps: {
        class: 'h-10',
        placeholder: $t('auth.usernameTip')
      },
      formItemProps: {
        class: 'mb-6'
      }
    },
    {
      component: 'InputPassword',
      fieldName: 'password',
      defaultValue: '123456',
      label: $t('auth.password'),
      componentProps: {
        class: 'h-10',
        placeholder: $t('auth.password')
      },
      formItemProps: {
        class: 'mb-6'
      }
    },
    {
      component: markRaw(SliderCaptcha),
      fieldName: 'captcha'
    }
  ],
  commonConfig: {
    hideLabel: true
  }
}

const [Form, extendedApi] = useKingForm(formOptions)

const logForm = async () => {
  console.log(`form-values:`, extendedApi.getValues())
}
</script>

<template>
  <div class="min-h-full">
    <div class="icon-doms m-2">
      <h3>icon-doms</h3>
      <div class="mb-6">
        <div icon-mdi:home />
        <div class="icon-lucide:activity h-3em w-3em" />
        <div icon-svg:vue-logo />
        <div icon-svg:logo></div>
        <div icon-svg:logo class="h-1.8em w-1.8em"></div>
        <SvgIcon icon="mdi:account-box-multiple-outline"></SvgIcon>
        <SvgIcon icon="svg:logo"></SvgIcon>
        <SvgIcon icon="svg:vue-logo"></SvgIcon>
        <SvgIcon icon="solar:moon-bold"></SvgIcon>
        <ElButton type="primary" round>Login</ElButton>
        <div>
          logo
          <div
            icon-svg:logo
            class="h-3em w-3em text-blue dark:text-orange"
          ></div>
        </div>
      </div>
    </div>

    <div class="function-doms m-2">
      <h3>function-doms</h3>
      <div class="mb-6 gap-2 flex">
        <ElButton type="primary" plain @click="toggleTheme">
          Toggle Theme
        </ElButton>
        <ElButton type="primary" @click="loginTest">loginSubmitTest</ElButton>
        <ElButton type="primary" @click="logoutTest">logoutSubmitTest</ElButton>
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
      <Form></Form>

      <ElButton type="primary" @click="logForm">log-form</ElButton>
    </div>
  </div>
</template>

<style lang="scss">
/* view-transition */
::view-transition-new(root),
::view-transition-old(root) {
  @apply animate-none mix-blend-normal;
}
::view-transition-old(root) {
  @apply z-[1];
}
::view-transition-new(root) {
  @apply z-[9999];
}
.dark::view-transition-old(root) {
  @apply z-[9999];
}
.dark::view-transition-new(root) {
  @apply z-[1];
}
</style>
