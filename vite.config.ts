import { fileURLToPath, URL } from 'url'

import { defineConfig } from './internal/vite-config'

export default defineConfig(async () => {
  // const envConfig: ImportMetaEnv = await loadEnv('VITE_', getConfFiles())
  // const { VITE_BASE_API_URL } = envConfig

  return {
    application: {},
    vite: {
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: '@use "@/styles/components/vars/index.scss" as *;',
            api: 'modern' // modern | modern-compiler
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
          '@': fileURLToPath(new URL('./src', import.meta.url)),
          '~': fileURLToPath(new URL('./', import.meta.url))
        }
      },
      server: {
        hmr: true,
        proxy: {
          ['/dev-api']: {
            changeOrigin: true,
            rewrite: (path) => path.replace(new RegExp(`^${'dev-api'}`), ''),
            // mock代理目标地址
            target: 'http://localhost:3060/dev-api',
            ws: true
          }
        }
      }
    }
  }
})
