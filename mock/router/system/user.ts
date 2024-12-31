import type { MockMethod } from 'vite-plugin-mock'
import db from '../../db/_index'
import {
  getPrefixURL,
  resultError,
  resultSuccess,
  clearToken,
  generateToken,
  requestParams,
  accessVerify
} from '../../utils/_index'

const routes: MockMethod[] = [
  {
    url: getPrefixURL('/auth/login'),
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body

      if (!password || !username) {
        return resultError('Username and password are required')
      }

      const findUser = db.user.find(
        (item) => item.username === username && item.password === password
      )

      if (!findUser) {
        clearToken()
        return resultError('Username or password is incorrect.')
      }

      const token = generateToken(findUser)

      return resultSuccess(
        {
          ...findUser,
          token
        },
        { message: 'Login successful!' }
      )
    }
  },
  {
    url: getPrefixURL('/auth/logout'),
    timeout: 200,
    method: 'get',
    response: (request: requestParams) => {
      const verify = accessVerify(request)
      if (!verify.isValid) return verify.result

      // 销毁令牌
      clearToken()

      return resultSuccess(null, { message: 'Token has been destroyed' })
    }
  }
]

export default routes
