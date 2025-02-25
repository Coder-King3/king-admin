import type { GenerateMenuAndRoutesOptions } from '~/types'

import { generateMenus } from './generate-menus'
import { generateRoutes } from './generate-routes'

async function generateAccessible(options: GenerateMenuAndRoutesOptions) {
  const { router } = options

  // 生成路由
  const accessibleRoutes = await generateRoutes(options)

  // 动态添加到router实例内
  accessibleRoutes.forEach((route) => {
    router.addRoute(route)
  })

  // 生成菜单
  const accessibleMenus = await generateMenus(accessibleRoutes, options.router)
  // const accessibleMenus = [] as any

  return { accessibleMenus, accessibleRoutes }
}

export { generateAccessible }
