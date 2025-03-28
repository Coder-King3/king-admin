/* eslint-disable no-console */
import type { PluginOption } from 'vite'

import type { H3MockPluginOptions } from '../types'

import getPort from 'get-port'
import { listenAndWatch, type Listener } from 'listhen'

import { colors, consola, getPathURL, trackNthAccess } from '../utils'

export const viteH3MockPlugin = ({
  mockServerEntry = getPathURL('../../../mock/app.ts'),
  port = 3065
}: H3MockPluginOptions = {}): PluginOption => {
  return {
    async configureServer(server) {
      const availablePort = await getPort({ port })
      if (availablePort !== port) {
        return
      }

      if (!mockServerEntry) {
        consola.log(`Entry "${mockServerEntry}" not found. Skip mock server.`)
        return
      }

      runH3Server(mockServerEntry, port)

      const _printUrls = server.printUrls
      server.printUrls = () => {
        _printUrls()

        consola.log(
          `  ${colors.green('➜')}  ${colors.bold('H3 Mock Server')}: ${colors.cyan(`http://localhost:${colors.bold(port)}/api`)}`
        )
      }
    },
    enforce: 'pre',
    name: 'vite:mock-server'
  }
}

async function runH3Server(entry: string, port: number) {
  let h3: Listener
  const reload = async () => {
    if (h3) {
      consola.info('Restarting dev server...')

      await h3.close()
    }

    const trackOptions = {
      logger: consola,
      port,
      showURL: false
    }

    // 解决 showURL 为 false 打印入口文件（🚀 Loading server entry）上方无间隔问题
    const listenOptions = trackNthAccess(trackOptions, 'logger', {
      callback: () => console.log(''),
      triggerCount: 3
    })

    h3 = await listenAndWatch(entry, listenOptions)

    console.log('')
    consola.success(colors.bold(colors.green('H3 Mock Server started.')))
  }
  return await reload()
}
