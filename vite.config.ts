import { fileURLToPath, URL } from 'url'

import { defineConfig } from './internal/vite-config'

export default defineConfig(async () => {
  const createAlias = (alias: string, path: string) => ({
    [alias]: fileURLToPath(new URL(path, import.meta.url))
  })

  return {
    application: {
      paths: {
        autoImportDtsUrl: fileURLToPath(
          new URL('./common/types/auto/auto-imports.d.ts', import.meta.url)
        ),
        componentsDtsUrl: fileURLToPath(
          new URL('./common/types/auto/components.d.ts', import.meta.url)
        )
      }
    },
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
          ...createAlias('~', './'),
          ...createAlias('@', './src'),

          // common package
          ...createAlias('@baseui', './common/baseui'),
          ...createAlias('@icons', './common/icons'),
          ...createAlias('@preferences', './common/preferences'),
          ...createAlias('@types', './common/types')
        }
      },
      server: {
        hmr: true,
        proxy: {
          '/api': {
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
            // mock代理目标地址
            target: `http://localhost:3065/api`,
            ws: true
          }
        }
      }
    }
  }
})
