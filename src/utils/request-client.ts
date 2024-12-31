import axios from 'axios'
import type {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosResponse
} from 'axios'

// Extending AxiosRequestConfig configuration
interface RequestInterceptors<T = AxiosResponse> {
  onRequestSuccess?: (config: AxiosRequestConfig) => AxiosRequestConfig
  onRequestFailure?: (error: any) => any
  onResponseSuccess?: (response: T) => T
  onResponseFailure?: (error: any) => any
}

interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: RequestInterceptors<T>
}

/**
 * The RequestClient class encapsulated based on Axios
 *
 *  1. Precise control over interceptors:
 *    > Global interceptors
 *    > Instance-level interceptors
 *    > Single-request interceptors
 *
 *  2. Type handling for response results using generics
 *
 */
class RequestClient {
  private instance: AxiosInstance
  private readonly config: RequestConfig

  // RequestClient Instance => Axios Instance
  constructor(config: RequestConfig) {
    this.config = config
    this.instance = axios.create(config)
    this.setupInterceptors()
  }

  // Setup All Interceptors
  private setupInterceptors() {
    // Global Interceptors
    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (error) => {
        return error
      }
    )
    this.instance.interceptors.response.use(
      (value) => {
        return value.data
      },
      (error) => {
        return error
      }
    )

    // Instance Interceptors
    this.instance.interceptors.request.use(
      this.config.interceptors?.onRequestSuccess as (
        config: InternalAxiosRequestConfig
      ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>,
      this.config.interceptors?.onRequestFailure
    )

    this.instance.interceptors.response.use(
      this.config.interceptors?.onResponseSuccess,
      this.config.interceptors?.onResponseFailure
    )
  }

  request<T = any>(config: RequestConfig<T>) {
    // Single-Request success interception handling
    if (config.interceptors?.onRequestSuccess) {
      config = config.interceptors.onRequestSuccess(config)
    }

    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((value) => {
          // Single-response success interception handling
          if (config.interceptors?.onResponseSuccess) {
            value = config.interceptors.onResponseSuccess(value)
          }

          resolve(value)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  get<T = any>(url: string, config: RequestConfig<T> = {}) {
    return this.request<T>({ ...config, url, method: 'GET' })
  }
  post<T = any>(url: string, config: RequestConfig<T> = {}) {
    return this.request<T>({ ...config, url, method: 'POST' })
  }
  delete<T = any>(url: string, config: RequestConfig<T> = {}) {
    return this.request<T>({ ...config, url, method: 'DELETE' })
  }
  patch<T = any>(url: string, config: RequestConfig<T> = {}) {
    return this.request<T>({ ...config, url, method: 'PATCH' })
  }
}

export { RequestClient }
