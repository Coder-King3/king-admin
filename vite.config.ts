import type { ConfigEnv, PluginOption, UserConfig } from 'vite'

import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'

import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import UnpluginIcons from 'unplugin-icons/vite'
import UnpluginImagemin from 'unplugin-imagemin/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig, loadEnv } from 'vite'
import viteCompression from 'vite-plugin-compression'
import { viteMockServe } from 'vite-plugin-mock'
import {
  createStyleImportPlugin,
  ElementPlusResolve
} from 'vite-plugin-style-import'
import VueDevTools from 'vite-plugin-vue-devtools'

const getPathURL = (url: string) => fileURLToPath(new URL(url, import.meta.url))
const getBoolean = (value: string | undefined) => value === 'true'
const getNumber = (value: string | undefined, fallback: number) =>
  Number(value) || fallback

/**
 * 读取 package.json 文件
 */
async function readPackageJSON(root: string): Promise<PackageJson> {
  const packagePath = resolve(root, 'package.json')
  const content = await readFileSync(packagePath, { encoding: 'utf-8' })
  return JSON.parse(content)
}

/**
 * Vite 注入项目信息插件
 */
export async function viteMetadataPlugin(
  root = process.cwd()
): Promise<PluginOption> {
  const { author, homepage, license, version } = await readPackageJSON(root)

  return {
    name: 'vite:inject-metadata',
    enforce: 'post',
    async config() {
      const isAuthorObject = typeof author === 'object'
      const authorName = isAuthorObject ? author?.name : author
      const authorEmail = isAuthorObject ? author?.email : null
      const authorUrl = isAuthorObject ? author?.url : null

      const metadata = {
        authorEmail,
        authorName,
        authorUrl,
        homepage,
        license,
        version
      }

      return {
        define: {
          __KING_ADMIN_METADATA__: JSON.stringify(metadata), // 注入到全局变量
          'import.meta.env.VITE_APP_VERSION': JSON.stringify(version) // 注入版本信息
        }
      }
    }
  }
}

// 路径配置
const paths = {
  src: getPathURL('./src'),
  mock: getPathURL('./mock'),
  autoImports: getPathURL('./src/types/auto/auto-imports.d.ts'),
  components: getPathURL('./src/types/auto/components.d.ts')
}

function loadConditionPlugins(conditionPlugins: ConditionPlugin[]) {
  const plugins: PluginOption[] = []
  for (const conditionPlugin of conditionPlugins) {
    if (conditionPlugin.condition) {
      const realPlugins = conditionPlugin.plugins()
      plugins.push(...realPlugins)
    }
  }
  return plugins.flat()
}

function loadCommonPlugins() {
  const commonPlugins: ConditionPlugin[] = [
    Vue(),
    UnoCSS(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      dts: paths.autoImports
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass'
        })
      ],
      dts: paths.components
    }),
    createStyleImportPlugin({
      resolves: [ElementPlusResolve()],
      libs: [
        {
          libraryName: 'element-plus',
          esModule: true,
          resolveStyle: (name: string) => {
            return `element-plus/theme-chalk/${name}.css`
          }
        }
      ]
    })
  ].map((plugin) => ({ condition: true, plugins: () => [plugin] }))

  return commonPlugins
}

// 插件加载
function loadApplicationPlugins(options: PluginOptions) {
  const isBuild = options.isBuild
  const env = options.env

  const { mock, compress, devTools, imagemin, icons, injectMetadata } = options

  const commonPlugins = loadCommonPlugins()

  const plugins = loadConditionPlugins([
    ...commonPlugins,
    {
      condition: injectMetadata,
      plugins: () => [viteMetadataPlugin()]
    },
    {
      condition: mock,
      plugins: () => [
        viteMockServe({
          ignore: /^_/,
          mockPath: paths.mock,
          enable: mock, // 是否启用 mock 功能
          watchFiles: !isBuild, // 监视文件更改 更改mock的时候，不需要重新启动编译
          logger: !isBuild //  是否在控制台显示请求日志
        })
      ]
    },
    {
      condition: compress,
      plugins: () => {
        const compressPlugins = []
        switch (env.VITE_COMPRESS) {
          case 'gzip': {
            compressPlugins.push(
              viteCompression({
                ext: '.gz'
              })
            )
            break
          }
          case 'brotli': {
            compressPlugins.push(
              viteCompression({
                ext: '.br',
                algorithm: 'brotliCompress'
              })
            )
            break
          }
        }
        return compressPlugins
      }
    },
    {
      condition: !isBuild && devTools,
      plugins: () => [VueDevTools()]
    },
    {
      condition: imagemin,
      plugins: () => [UnpluginImagemin()]
    },
    {
      condition: !isBuild && icons,
      plugins: () => [UnpluginIcons()]
    }
  ])

  return plugins
}

export default defineConfig(({ mode, command }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  const isBuild = command === 'build'
  const env = loadEnv(mode, root) as ImportMetaEnv

  const {
    VITE_BASE_API_URL,
    VITE_COMPRESS,
    VITE_DEVTOOLS,
    VITE_PORT,
    VITE_MOCK_SERVER
  } = env

  const plugins = loadApplicationPlugins({
    isBuild,
    env,
    injectMetadata: true,
    mock: getBoolean(VITE_MOCK_SERVER),
    compress: VITE_COMPRESS !== 'none',
    devTools: getBoolean(VITE_DEVTOOLS),
    imagemin: true,
    icons: true
  })

  const applicationConfig: UserConfig = {
    base: '/',
    build: {
      rollupOptions: {
        output: {
          assetFileNames: '[ext]/[name]-[hash].[ext]',
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'jse/index-[name]-[hash].js'
        }
      },
      target: 'es2015' // esnext
    },
    esbuild: {
      ...(isBuild
        ? {
            pure: ['console.log'],
            drop: ['debugger']
          }
        : {}),
      legalComments: 'none'
    },
    resolve: {
      alias: {
        '@': paths.src
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: '@use "@/desgin/ui/vars/index.scss" as *;'
        }
      }
    },
    plugins,
    server: {
      host: '0.0.0.0',
      port: getNumber(VITE_PORT, 3060),
      hmr: true,
      proxy: {
        [VITE_BASE_API_URL]: {
          target: VITE_BASE_API_URL,
          rewrite: (path) =>
            path.replace(new RegExp(`^${VITE_BASE_API_URL}`), ''),
          changeOrigin: true
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
    }
  }

  return applicationConfig
})
