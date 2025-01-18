import type {
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig
} from 'axios'

interface HttpResponse<T = any> {
  /**
   * 0 表示成功 其他表示失败
   * 0 means success, others means fail
   */
  code: number
  data: T
  message: string
}

type MakeErrorMessageFn = (message: string, error: any) => void

type RequestClientOptions = CreateAxiosDefaults

type RequestContentType =
  | 'application/json;charset=utf-8'
  | 'application/octet-stream;charset=utf-8'
  | 'application/x-www-form-urlencoded;charset=utf-8'
  | 'multipart/form-data;charset=utf-8'

interface RequestInterceptorConfig {
  fulfilled?: (
    config: InternalAxiosRequestConfig
  ) =>
    | InternalAxiosRequestConfig<any>
    | Promise<InternalAxiosRequestConfig<any>>
  rejected?: (error: any) => any
}

type RequestResponse<T = any> = AxiosResponse<T>

interface ResponseInterceptorConfig<T = any> {
  fulfilled?: (
    response: AxiosResponse<T>
  ) => AxiosResponse | Promise<AxiosResponse>
  rejected?: (error: any) => any
}

export type {
  HttpResponse,
  MakeErrorMessageFn,
  RequestClientOptions,
  RequestContentType,
  RequestInterceptorConfig,
  RequestResponse,
  ResponseInterceptorConfig
}
