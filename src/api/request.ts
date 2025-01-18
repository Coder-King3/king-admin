import type { HttpResponse } from '@/utils'

import { useAccessStore } from '@/store'
import { errorMessageResponseInterceptor, RequestClient } from '@/utils'

import { ElMessage } from 'element-plus'

function createRequestClient(baseURL: string) {
  const client = new RequestClient({
    baseURL
  })

  function formatToken(token: null | string) {
    return token ? `Bearer ${token}` : null
  }

  // request 请求头处理
  client.addRequestInterceptor({
    fulfilled: async (config) => {
      const accessStore = useAccessStore()

      config.headers.Authorization = formatToken(accessStore.accessToken)
      // config.headers['Accept-Language'] = preferences.app.locale;
      return config
    }
  })

  // response 数据解构
  client.addResponseInterceptor<HttpResponse>({
    fulfilled: (response) => {
      const { data: responseData, status } = response

      const { code, data } = responseData

      if (status >= 200 && status < 400 && code === 0) {
        return data
      }
      throw Object.assign({}, response, { response })
    }
  })

  // 通用的错误处理,如果没有进入上面的错误处理逻辑，就会进入这里
  client.addResponseInterceptor(
    errorMessageResponseInterceptor((msg: string, error) => {
      // 这里可以根据业务进行定制,你可以拿到 error 内的信息进行定制化处理，根据不同的 code 做不同的提示，而不是直接使用 message.error 提示 msg
      // 当前mock接口返回的错误字段是 error 或者 message
      const responseData = error?.response?.data ?? {}
      const errorMessage = responseData?.error ?? responseData?.message ?? ''
      // 如果没有错误信息，则会根据状态码进行提示
      ElMessage.error({
        message: errorMessage || msg
      })
    })
  )

  return client
}

const apiURL = import.meta.env.VITE_BASE_API_URL

export const requestClient = createRequestClient(apiURL)
