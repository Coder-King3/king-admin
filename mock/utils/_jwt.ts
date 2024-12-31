import type { UserInfo } from '../db/_user'
import { ref, type Ref } from './_reactive'

// 定义secretKey秘钥
const secretKey: string = 'king-3 <^_^> ck-admin-account:'

let token: Ref<string | null>
let loaded = false
if (!loaded) {
  token = ref(null)
  loaded = true
}

// 创建token函数
function generateToken(user: UserInfo) {
  token.value = secretKey + user.username

  return token.value
}

// 校验token函数
function verifyToken(userToken: string) {
  const isValid = userToken.includes(token.value as string)

  return isValid
}

function clearToken() {
  token.value = null
}

export { generateToken, verifyToken, clearToken }
