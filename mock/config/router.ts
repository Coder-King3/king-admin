import type { App, EventHandler, Router } from 'h3'

import type {
  HTTPMethod,
  RouteConfig,
  RouterOptions,
  RoutesBuilder,
  RoutesGroup
} from '../types'

import { createRouter as createH3Router, defineEventHandler, useBase } from 'h3'

import { isEmpty } from '../utils/inference'

/* Router */
// 创建router
function createRouter(config: RouterOptions) {
  const { prefix, routes } = config

  const h3Router = createH3Router()

  registerRoutes(h3Router, routes)

  return configureRouter(h3Router, routes, prefix)
}
// 注册routes
function registerRoutes(router: Router, routes: RouteConfig[]) {
  routes.forEach(({ handler, method = 'get', url }) => {
    if (!router[method]) {
      console.warn(`Unsupported HTTP method: ${method}`)
      return
    }
    router[method](url, defineEventHandler(handler))
  })
}
// 挂载router
const setupRouter = (app: App, router: Router) => {
  app.use(router)
}

// 初始化 router
function configureRouter(
  router: Router,
  routes: RouteConfig[],
  prefix?: string
) {
  const basePaths = prefix ? ['/', prefix] : ['/']

  const targetRouter = prefix ? wrapWithPrefix(router, prefix) : router

  configureHomeTemplate(targetRouter, routes, basePaths)

  return targetRouter
}
function wrapWithPrefix(router: Router, prefix: string) {
  const baseRouter = createH3Router()

  baseRouter.use(`${prefix}/**`, useBase(prefix, router.handler))

  return baseRouter
}
function configureHomeTemplate(
  router: Router,
  routes: RouteConfig[],
  paths: string[]
) {
  paths
    .filter((path) => !isEmpty(path))
    .forEach((path) => {
      router.get(
        path,
        defineEventHandler(() => generateHomeApis(routes))
      )
    })
}
function generateHomeApis(routes: RouteConfig[]) {
  const routePaths = getRoutePaths(routes)

  function getStyle() {
    return `
      <style>
        * { padding: 0; margin: 0; }
        .apis-box { width: 600px; padding: 15px; margin: 100px auto; background: #f1f3f6; border: 1px solid #e4e4e7; border-radius: 8px; }
        .apis-title { margin-bottom: 30px; text-align: center; }
        .apis-list { display: flex; flex-wrap: wrap; gap: 10px; justify-content: space-between; list-style: none; }
        .apis-list-item { flex: 0 0 calc(45%); padding: 10px; border: 1px solid #e4e4e7; transition: all 300ms; display: flex; justify-content: space-between; align-items: center; background: #f9fafb; border-radius: 8px; }
        .apis-list-item:hover { color: #006be6; background: #fff; border: 1px solid #006be6; }
        .apis-list-item:hover .apis-list-item_tag { background: #006be6; color: #fff; }
        .apis-list-item_title { font-size: 14px; font-weight: 500; }
        .apis-list-item_tag { font-size: 12px; font-weight: bold; padding: 4px 8px; border-radius: 4px; background: #f1f3f6; color: #000; text-transform: uppercase; transition: all 150ms; }
      </style>
    `
  }

  function getScript() {
    return `
      <script>
        document.querySelectorAll('.apis-list-item').forEach((item, index) => {
          item.addEventListener('click', () => {
            navigator.clipboard.writeText(document.querySelectorAll('.apis-list-item_title')[index].innerText)
              .then(() => console.log('Copy Success!'))
              .catch(err => console.error('Copy Error!', err));
          });
        });
      </script>
    `
  }

  return `
    <div class="apis-box">
      ${getStyle()}
      <h3 class="apis-title">Mock Serve Apis</h3>
      <ul class="apis-list">
        ${routePaths
          .map(
            ([url, method]) => `
          <li class="apis-list-item">
            <div class="apis-list-item_title">${url}</div>
            <div class="apis-list-item_tag">${method}</div>
          </li>
        `
          )
          .join('')}
      </ul>
      ${getScript()}
    </div>
  `
}

/* Routes */
// 创建 routes group
function createRoutesGroup(options: RoutesGroup[]) {
  return options.flatMap(({ prefix, routes }) =>
    addRoutesPrefix(routes, prefix)
  )
}
// 创建 routes
function createRoutes(options: RouteConfig[] = []): RoutesBuilder {
  // 核心方法映射表
  const methods: HTTPMethod[] = ['get', 'patch', 'post', 'put', 'delete']

  const routes: RoutesBuilder = {
    add(url, method, handler) {
      this.values.push({ handler, method, url })
    },
    values: options,

    // Part: 初始空函数占位
    delete: () => {},
    get: () => {},
    patch: () => {},
    post: () => {},
    put: () => {}
  }

  // 动态生成快捷方法
  methods.forEach((method) => {
    routes[method] = function (
      this: RoutesBuilder,
      url: string,
      handler: EventHandler
    ) {
      this.add(url, method, handler)
    }
  })

  return routes
}

/* utils */
function addRoutesPrefix(routes: RouteConfig[], prefix: string) {
  if (isEmpty(prefix)) return routes

  const prefixRoutes = routes.map((route) => {
    const { url, ...otherOptions } = route
    const options = {
      url: prefix + (url === '/' ? '' : url),
      ...otherOptions
    }

    return options
  })

  return prefixRoutes
}

function getRoutePaths(routes: RouteConfig[]) {
  const routePaths = routes.map((route) => [route.url, route.method])

  return routePaths
}

export {
  addRoutesPrefix,
  createRouter,
  createRoutes,
  createRoutesGroup,
  getRoutePaths,
  setupRouter
}
