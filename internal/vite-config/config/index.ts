import type { DefineConfig } from '../types'

import { existsSync } from 'node:fs'
import { join } from 'node:path'

import { defineApplicationConfig } from './application'

export * from './application'

function defineConfig(
  userConfigPromise?: DefineConfig,
  type: 'application' | 'auto' | null = 'auto'
) {
  let projectType = type

  // 根据包是否存在 index.html,自动判断类型
  if (projectType === 'auto') {
    const htmlPath = join(process.cwd(), 'index.html')
    projectType = existsSync(htmlPath) ? 'application' : null
  }

  switch (projectType) {
    case 'application': {
      return defineApplicationConfig(userConfigPromise)
    }
    default: {
      throw new Error(`Unsupported project type: ${projectType}`)
    }
  }
}

export { defineConfig }
