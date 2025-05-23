import type {
  ComponentRecordType,
  GenerateMenuAndRoutesOptions,
  RouteRecordRaw,
  RouteRecordStringComponent
} from '@types'

import { mapTree } from '../tree'

async function generateRoutes(options: GenerateMenuAndRoutesOptions) {
  const { fetchMenuListAsync, layoutMap = {}, pageMap = {} } = options

  try {
    const menuRoutes = await fetchMenuListAsync?.()
    if (!menuRoutes) {
      return []
    }

    const normalizePageMap: ComponentRecordType = {}

    for (const [key, value] of Object.entries(pageMap)) {
      normalizePageMap[normalizeViewPath(key)] = value
    }

    const routes = convertRoutes(menuRoutes, layoutMap, normalizePageMap)

    return routes
  } catch (error) {
    console.error(error)
    return []
  }
}

function convertRoutes(
  routes: RouteRecordStringComponent[],
  layoutMap: ComponentRecordType,
  pageMap: ComponentRecordType
): RouteRecordRaw[] {
  return mapTree(routes, (node) => {
    const route = node as unknown as RouteRecordRaw
    const { component, name } = node

    if (!name) {
      console.error('route name is required', route)
    }

    // layout转换
    if (component && layoutMap[component]) {
      route.component = layoutMap[component]
      // 页面组件转换
    } else if (component) {
      const normalizePath = normalizeViewPath(component)
      route.component =
        pageMap[
          normalizePath.endsWith('.vue')
            ? normalizePath
            : `${normalizePath}.vue`
        ]
    }

    return route
  })
}

function normalizeViewPath(path: string): string {
  // 去除相对路径前缀
  const normalizedPath = path.replace(/^(\.\/|\.\.\/)+/, '')

  // 确保路径以 '/' 开头
  const viewPath = normalizedPath.startsWith('/')
    ? normalizedPath
    : `/${normalizedPath}`

  // 耦合king-admin的目录结构
  return viewPath.replace(/^\/views/, '')
}

export { generateRoutes }
