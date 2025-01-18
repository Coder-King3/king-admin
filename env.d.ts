/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent
  export default component
}

declare module 'unplugin-imagemin/vite' {
  const vitePlugin: any
  export default vitePlugin
}

/** 声明 vite 环境变量的类型 */
interface ImportMetaEnv {
  readonly VITE_APP_NAME: string
  readonly VITE_APP_NAMESPACE: string
  readonly VITE_BASE_API_URL: string
  readonly VITE_ROUTER_MODE: 'hash' | 'history'
  readonly VITE_PORT?: string
  readonly VITE_DEVTOOLS: 'false' | 'true'
  readonly VITE_COMPRESS: 'brotli' | 'gzip' | 'none'
  readonly VITE_MOCK_SERVER: 'false' | 'true'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
