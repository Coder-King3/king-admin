import { requestClient } from '../request'

export namespace AuthApi {
  /** 登录接口参数 */
  export interface LoginParams {
    password?: string
    username?: string
  }

  /** 登录接口返回值 */
  export interface LoginResult {
    accessToken: string
  }
}

export async function loginApi(data: AuthApi.LoginParams) {
  return requestClient.post('/auth/login', { data })
}

export async function logoutApi() {
  return requestClient.get('/auth/logout')
}
