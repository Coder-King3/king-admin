// @see: https://cn.vite.dev/config/

import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import type { ConfigEnv, UserConfig, PluginOption, ESBuildOptions } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
// 自动引入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// 手动导入组件时自动导入样式
import AutoElementPlusStyle from 'unplugin-element-plus/vite'
// Icons 配置
import Icons from 'unplugin-icons/vite'
// mock配置
import { viteMockServe } from 'vite-plugin-mock'
// gzip压缩
import viteCompression from 'vite-plugin-compression'
// 图片优化压缩
// @ts-ignore
import imagemin from 'unplugin-imagemin/vite'
// VueDevTools开发工具
import VueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  // 在配置中使用环境变量
  const env = loadEnv(mode, process.cwd(), '')

  const isBuild = mode !== 'development'
  const isMock = env.VITE_MOCK_SERVER === 'true'
  const isCompress = env.VITE_COMPRESS !== 'none'
  const isDevTools = env.VITE_DEVTOOLS === 'true'
  const dropConsoleConfig: ESBuildOptions = isBuild
    ? {
        // 打包构建时移除 console.log
        pure: ['console.log'],
        // 打包构建时移除 debugger
        drop: ['debugger'],
        // 打包构建时移除所有注释
        legalComments: 'none'
      }
    : {}

  // 路径配置 paths
  const paths = {
    src: fileURLToPath(new URL('./src', import.meta.url)),
    mock: fileURLToPath(new URL('./mock', import.meta.url)),
    svgIcons: fileURLToPath(new URL('./src/assets/svg', import.meta.url)),
    autoImports: fileURLToPath(
      new URL('./src/typings/auto/auto-imports.d.ts', import.meta.url)
    ),
    components: fileURLToPath(
      new URL('./src/typings/auto/components.d.ts', import.meta.url)
    )
  }

  // vite plugins
  const plugins: PluginOption[] = [
    vue(),
    UnoCSS(),
    AutoImport({
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      // imports: ["vue", "vue-router", "pinia"],

      resolvers: [
        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
        ElementPlusResolver()
      ],
      dts: paths.autoImports
    }),
    Components({
      // dirs: [],
      resolvers: [
        // 自动导入 Element Plus 组件
        ElementPlusResolver({
          importStyle: 'sass'
        })
      ],
      dts: paths.components
    }),
    // AutoElementPlusStyle({ useSource: false }),
    // 自动下载 iconify 图标库
    Icons({
      compiler: 'vue3',
      autoInstall: true
    }),
    // Imagemin 图片压缩插件
    imagemin()
  ]
  // vite-plugin-mock
  if (isMock) {
    plugins.push(
      viteMockServe({
        ignore: /^_/,
        mockPath: 'mock',
        enable: true, // 是否启用 mock 功能
        watchFiles: !isBuild, // 监视文件更改 更改mock的时候，不需要重新启动编译
        logger: !isBuild, //  是否在控制台显示请求日志
        // @ts-ignore
        injectCode: `
          import { setupProdMockServer } from './mock/_createProductionServer';
          setupProdMockServer();
        `
      })
    )
  }
  // vite-plugin-compression
  if (isCompress) {
    switch (env.VITE_COMPRESS) {
      case 'gzip': {
        plugins.push(
          viteCompression({
            ext: '.gz'
          })
        )
        break
      }
      case 'brotli': {
        plugins.push(
          viteCompression({
            ext: '.br',
            algorithm: 'brotliCompress'
          })
        )
        break
      }
    }
  }
  // vite-plugin-vue-devtools
  if (isDevTools) {
    plugins.push(VueDevTools())
  }

  // Vite UserConfig
  const config: UserConfig = {
    resolve: {
      alias: {
        '@': paths.src
      }
    },
    plugins,
    css: {
      preprocessorOptions: {
        scss: {
          // 弃用旧版 [legacy api] 使用[modern api]
          api: 'modern-compiler',
          // 引入 ui 组件库(element-plus) theme-var 配置
          additionalData: '@use "@/desgin/ui/vars/index.scss" as *;'
        }
      }
    },
    server: {
      host: '0.0.0.0',
      port: parseInt(env.VITE_PORT),
      hmr: true,
      proxy: {
        [env.VITE_BASE_API_URL]: {
          // mock代理目标地址
          target: isMock
            ? `http://localhost:${env.VITE_PORT}/${env.VITE_BASE_API_URL}`
            : env.VITE_BASE_API_URL,
          //重写路径
          rewrite: (path) =>
            path.replace(new RegExp('^' + env.VITE_BASE_API_URL), ''),
          // 允许跨域
          changeOrigin: true
        }
      }
    },
    // 混淆器
    esbuild: { target: 'esnext', ...dropConsoleConfig },

    // 预编译，增加访问速度，针对node_modules
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
    }
  }

  return config
})
