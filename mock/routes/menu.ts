import { createRoutes } from '../config'
import { verifyAccessToken } from '../utils/jwt-util'
import { MOCK_MENUS } from '../utils/mock-data'
import { unAuthorizedResponse, useResponseSuccess } from '../utils/response'

const routes = createRoutes()

routes.get('/all', (event) => {
  const userinfo = verifyAccessToken(event)
  if (!userinfo) {
    return unAuthorizedResponse(event)
  }

  const menus =
    MOCK_MENUS.find((item) => item.username === userinfo.username)?.menus ?? []
  return useResponseSuccess(menus)
})

export default routes.values
