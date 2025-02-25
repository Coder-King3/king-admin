import type { UserConfig } from 'vite'

import type { DefineApplicationOptions } from '../types'

import { defineConfig, loadEnv, mergeConfig } from 'vite'

import { loadApplicationPlugins } from '../plugins'
import { loadAndConvertEnv } from '../utils'
import { getCommonConfig } from './common'

function defineApplicationConfig(userConfigPromise?: DefineApplicationOptions) {
  return defineConfig(async (config) => {
    const options = await userConfigPromise?.(config)
    const { port, ...envConfig } = await loadAndConvertEnv()
    const { command, mode } = config
    const { application = {}, vite = {} } = options || {}
    const root = process.cwd()
    const isBuild = command === 'build'
    const env = loadEnv(mode, root)

    const plugins = await loadApplicationPlugins({
      compress: false,
      compressTypes: ['brotli', 'gzip'],
      devtools: true,
      env,
      html: true,
      i18n: true,
      injectMetadata: true,
      isBuild,
      mockServe: !isBuild,
      mode,
      ...envConfig,
      ...application
      // injectAppLoading: true,
      // license: true,
    })

    const applicationConfig: UserConfig = {
      build: {
        rollupOptions: {
          output: {
            assetFileNames: '[ext]/[name]-[hash].[ext]',
            chunkFileNames: 'js/[name]-[hash].js',
            entryFileNames: 'jse/index-[name]-[hash].js'
          }
        },
        target: 'es2015'
      },
      esbuild: {
        drop: isBuild
          ? [
              // 'console',
              'debugger'
            ]
          : [],
        legalComments: 'none'
      },
      plugins,
      server: {
        host: true,
        port,
        warmup: {
          // 预热文件
          clientFiles: [
            './index.html',
            './src/bootstrap.ts',
            './src/{views,layouts,router,store,api}/*'
          ]
        }
      }
    }

    const mergedCommonConfig = mergeConfig(
      await getCommonConfig(),
      applicationConfig
    )
    return mergeConfig(mergedCommonConfig, vite)
  })
}

export { defineApplicationConfig }
