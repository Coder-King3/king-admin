import { createRoutes } from '../config'
import { verifyAccessToken } from '../utils/jwt-util'
import { unAuthorizedResponse, useResponseSuccess } from '../utils/response'

const routes = createRoutes()

routes.get('/info', (event) => {
  const userinfo = verifyAccessToken(event)
  if (!userinfo) {
    return unAuthorizedResponse(event)
  }
  return useResponseSuccess(userinfo)
})

export default routes.values
