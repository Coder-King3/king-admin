import { type AxiosRequestConfig } from 'axios'
import { RequestClient, localCache } from '@/utils'
import { LOGIN_TOKEN } from '@/constants'

const setToken = (config: AxiosRequestConfig<any>) => {
  // 每一个请求都自动携带token
  const token = localCache.getCache(LOGIN_TOKEN)
  if (config?.headers && token) {
    config.headers.Authorization = 'Bearer ' + token
  }
}

const requestClient = new RequestClient({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  timeout: 10000,
  interceptors: {
    onRequestSuccess: (config) => {
      setToken(config)

      return config
    },
    onResponseSuccess(response) {
      return response
    }
  }
})

export { requestClient }
