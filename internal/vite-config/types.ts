import type { ConfigEnv, PluginOption, UserConfig } from 'vite'

/**
 * .env 文件中定义的类型
 */
interface ImportMetaEnv {
  readonly VITE_APP_NAMESPACE: string
  readonly VITE_APP_TITLE: string
  readonly VITE_BASE: string
  readonly VITE_BASE_API_URL: string
  readonly VITE_COMPRESS: 'brotli' | 'gzip' | 'none'
  readonly VITE_DEVTOOLS: 'false' | 'true'
  readonly VITE_MOCK_SERVER: 'false' | 'true'
  readonly VITE_PORT: string
  readonly VITE_ROUTER_MODE: 'hash' | 'history'
}

/**
 * 用于判断是否需要加载插件
 */
interface ConditionPlugin {
  // 判断条件
  condition?: boolean
  // 插件对象
  plugins: () => PluginOption[] | PromiseLike<PluginOption[]>
}

/**
 * 用于配置插件所需的一些路径
 */
interface PathsOptions {
  /** unplugin-auto-import dts 声明文件路径  */
  autoImportDtsUrl?: string
  /** unplugin-vue-components dts 声明文件路径  */
  componentsDtsUrl?: string
  /** vite-plugin-mock mock文件夹路径 */
  mockServeDirUrl?: string
}

interface CommonPluginOptions {
  /** 是否开启devtools */
  devtools?: boolean
  /** 环境变量 */
  env?: Record<string, any>
  /** 是否注入metadata */
  injectMetadata?: boolean
  /** 是否构建模式 */
  isBuild?: boolean
  /** 构建模式 */
  mode?: string
  /** 路径配置 */
  paths?: PathsOptions
}

interface ApplicationPluginOptions extends CommonPluginOptions {
  /** 开启 gzip|brotli 压缩 */
  compress?: boolean
  /** 压缩类型 */
  compressTypes?: ('brotli' | 'gzip')[]
  /** 是否开启html插件  */
  html?: boolean
  /** 是否开启i18n */
  i18n?: boolean
  /** 是否开启 mock plugin*/
  mockServe?: boolean
  /** 是否注入app loading */
  // injectAppLoading?: boolean
  /** 是否注入版权信息 */
  // license?: boolean
  /** 在构建的时候抽离配置文件 */
  // extraAppConfig?: boolean
}

type ApplicationOptions = ApplicationPluginOptions

type DefineApplicationOptions = (config?: ConfigEnv) => Promise<{
  application?: ApplicationOptions
  vite?: UserConfig
}>

type DefineConfig = DefineApplicationOptions

export type {
  ApplicationOptions,
  ApplicationPluginOptions,
  CommonPluginOptions,
  ConditionPlugin,
  DefineApplicationOptions,
  DefineConfig,
  ImportMetaEnv
}
