import { requestClient } from '@/api/request'

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

/**
 * 登录
 */
export async function loginApi(data: AuthApi.LoginParams) {
  return requestClient.post<AuthApi.LoginResult>('/auth/login', {
    data
  } as any)
}

/**
 * 获取用户信息
 */
export async function getUserInfoApi() {
  return requestClient.get('/user/info')
}

/**
 * 获取用户权限 codes
 */
export async function getAccessCodesApi() {
  return requestClient.get<string[]>('/auth/codes')
}

/**
 * 退出登录
 */
export async function logoutApi() {
  return requestClient.get('/auth/logout')
}
