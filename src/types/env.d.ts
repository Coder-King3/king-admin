// env types
interface ImportMetaEnv {
  readonly VITE_APP_NAME: string
  readonly VITE_APP_NAMESPACE: string
  readonly VITE_BASE_API_URL: string
  readonly VITE_ROUTER_MODE: 'hash' | 'history'
  readonly VITE_PORT: string
  readonly VITE_DEVTOOLS: 'false' | 'true'
  readonly VITE_COMPRESS: 'brotli' | 'gzip' | 'none'
  readonly VITE_MOCK_SERVER: 'false' | 'true'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

/* vite types */

interface PluginOptions {
  isBuild?: boolean
  env: ImportMetaEnv
  mock: boolean
  compress: boolean
  devTools: boolean
  imagemin: boolean
  icons: boolean
  injectMetadata: boolean
}

interface CommonConfigOptions {
  isBuild?: boolean
}

/**
 * 用于判断是否需要加载插件
 */
interface ConditionPlugin {
  // 判断条件
  condition?: boolean
  // 插件对象
  plugins: () => PluginOption[]
}

/**
 * package.json 中需要注入配置的部分类型定义
 */
interface PackageJson {
  author: string | { name: string; email: string; url: string }
  homepage: string
  license: string
  version: string
}
