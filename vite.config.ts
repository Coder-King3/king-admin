import { fileURLToPath, URL } from 'url'

import {
  defineConfig,
  getConfFiles,
  type ImportMetaEnv,
  loadEnv
} from './internal/vite-config'

export default defineConfig(async () => {
  const envConfig: ImportMetaEnv = await loadEnv('VITE_', getConfFiles())
  const { VITE_BASE_API_URL: proxyApi, VITE_PORT: port = 3060 } = envConfig

  const createAlias = (alias: string, path: string) => ({
    [alias]: fileURLToPath(new URL(path, import.meta.url))
  })

  return {
    application: {},
    vite: {
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: '@use "@/styles/components/vars/index.scss" as *;',
            api: 'modern-compiler' // modern | modern-compiler
          }
        }
      },
      optimizeDeps: {
        include: [
          'vue',
          'vue-router',
          'pinia',
          'axios',
          '@vueuse/core',
          'echarts',
          'vue-i18n',
          'element-plus/es/locale/lang/en',
          'element-plus/es/locale/lang/zh-cn'
        ]
      },
      resolve: {
        alias: {
          ...createAlias('@', './src'),
          ...createAlias('~', './')
        }
      },
      server: {
        hmr: true,
        proxy: {
          [proxyApi]: {
            changeOrigin: true,
            rewrite: (path) => path.replace(new RegExp(`^${proxyApi}`), ''),
            // mock代理目标地址
            target: `http://localhost:${port}/${proxyApi}`,
            ws: true
          }
        }
      }
    }
  }
})
