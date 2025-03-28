import type { PluginOption } from 'vite'

import type {
  ApplicationPluginOptions,
  CommonPluginOptions,
  ConditionPlugin
} from '../types'

import viteVueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import viteVue from '@vitejs/plugin-vue'
import ViteUnoCSS from 'unocss/vite'
import ViteAutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ViteVueComponents from 'unplugin-vue-components/vite'
import viteCompressPlugin from 'vite-plugin-compression'
import { createHtmlPlugin as viteHtmlPlugin } from 'vite-plugin-html'
import {
  createStyleImportPlugin,
  ElementPlusResolve
} from 'vite-plugin-style-import'
import viteVueDevTools from 'vite-plugin-vue-devtools'

import { getPathURL } from '../utils'
import { viteH3MockPlugin } from './h3-mock'
import { viteMetadataPlugin } from './inject-metadata'

/**
 * 获取条件成立的 vite 插件
 * @param conditionPlugins
 */
async function loadConditionPlugins(conditionPlugins: ConditionPlugin[]) {
  const plugins: PluginOption[] = []
  for (const conditionPlugin of conditionPlugins) {
    if (conditionPlugin.condition) {
      const realPlugins = await conditionPlugin.plugins()
      plugins.push(...realPlugins)
    }
  }
  return plugins.flat()
}

/**
 * 根据条件获取通用的vite插件
 */
async function loadCommonPlugins(
  options: CommonPluginOptions
): Promise<ConditionPlugin[]> {
  const { devtools, injectMetadata, isBuild, paths = {} } = options
  const {
    autoImportDtsUrl = getPathURL('../../../src/auto-imports.d.ts'),
    componentsDtsUrl = getPathURL('../../../src/components.d.ts')
  } = paths
  return [
    {
      condition: true,
      plugins: () => [viteVue()]
    },
    {
      condition: !isBuild && devtools,
      plugins: () => [viteVueDevTools()]
    },
    {
      condition: injectMetadata,
      plugins: async () => [await viteMetadataPlugin()]
    },
    {
      condition: true,
      plugins: async () => [ViteUnoCSS()]
    },
    {
      condition: true,
      plugins: async () => [
        ViteAutoImport({
          dts: autoImportDtsUrl,
          resolvers: [ElementPlusResolver()]
        })
      ]
    },
    {
      condition: true,
      plugins: async () => [
        ViteVueComponents({
          dts: componentsDtsUrl,
          resolvers: [
            ElementPlusResolver({
              importStyle: 'sass'
            })
          ]
        })
      ]
    },
    {
      condition: true,
      plugins: async () => [
        createStyleImportPlugin({
          libs: [
            {
              esModule: true,
              libraryName: 'element-plus',
              resolveStyle: (name: string) => {
                return `element-plus/theme-chalk/${name}.css`
              }
            }
          ],
          resolves: [ElementPlusResolve()]
        })
      ]
    }
  ]
}

/**
 * 根据条件获取应用类型的vite插件
 */
async function loadApplicationPlugins(
  options: ApplicationPluginOptions
): Promise<PluginOption[]> {
  // 单独取，否则commonOptions拿不到
  const isBuild = options.isBuild

  const {
    compress,
    compressTypes,
    h3Mock,
    h3MockOptions,
    html,
    i18n,
    ...commonOptions
  } = options
  const commonPlugins = await loadCommonPlugins(commonOptions)

  return await loadConditionPlugins([
    ...commonPlugins,
    {
      condition: i18n,
      plugins: async () => {
        return [
          viteVueI18nPlugin({
            compositionOnly: true,
            fullInstall: true,
            runtimeOnly: true
          })
        ]
      }
    },
    {
      condition: h3Mock,
      plugins: async () => {
        return [await viteH3MockPlugin(h3MockOptions)]
      }
    },
    {
      condition: isBuild && !!compress,
      plugins: () => {
        const compressPlugins: PluginOption[] = []
        if (compressTypes?.includes('brotli')) {
          compressPlugins.push(
            viteCompressPlugin({ deleteOriginFile: false, ext: '.br' })
          )
        }
        if (compressTypes?.includes('gzip')) {
          compressPlugins.push(
            viteCompressPlugin({ deleteOriginFile: false, ext: '.gz' })
          )
        }
        return compressPlugins
      }
    },
    // {
    //   condition: license,
    //   plugins: async () => [await viteLicensePlugin()],
    // },
    {
      condition: !!html,
      plugins: () => [viteHtmlPlugin({ minify: true })]
    }
  ])
}

export { loadApplicationPlugins, viteCompressPlugin }
