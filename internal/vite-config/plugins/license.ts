import type { PluginOption } from 'vite'

import { EOL } from 'node:os'

import { dateUtil, readPackageJSON } from '../utils'

/**
 * 用于注入版权信息
 * @returns
 */

async function viteLicensePlugin(
  root = process.cwd()
): Promise<PluginOption | undefined> {
  const {
    description = '',
    homepage = '',
    version = ''
  } = await readPackageJSON(root)

  return {
    apply: 'build',
    enforce: 'post',
    generateBundle: {
      handler: (_options: any, bundle: any) => {
        const date = dateUtil().format('YYYY-MM-DD ')
        const copyrightText = `/*!
  * King Admin
  * Version: ${version}
  * Author: king3
  * Copyright (C) 2024 King
  * License: MIT License
  * Description: ${description}
  * Date Created: ${date}
  * Homepage: ${homepage}
  * Contact: w2196592083@gmail.com
*/
              `.trim()

        for (const [, fileContent] of Object.entries(bundle)) {
          if (
            (fileContent as any).type === 'chunk' &&
            (fileContent as any).isEntry
          ) {
            const chunkContent = fileContent as any
            // 插入版权信息
            const content = chunkContent.code
            const updatedContent = `${copyrightText}${EOL}${content}`

            // 更新bundle
            ;(fileContent as any).code = updatedContent
          }
        }
      },
      order: 'post'
    },
    name: 'vite:license'
  }
}

export { viteLicensePlugin }
