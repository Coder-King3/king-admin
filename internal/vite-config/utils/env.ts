import type { ApplicationPluginOptions, ImportMetaEnv } from '../types'

import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath, URL } from 'node:url'

import dotenv from 'dotenv'

const getBoolean = (value: string | undefined) => value === 'true'

const getString = (value: string | undefined, fallback: string) =>
  value ?? fallback

const getNumber = (value: string | undefined, fallback: number) =>
  Number(value) || fallback

export const getPathURL = (url: string) =>
  fileURLToPath(new URL(url, import.meta.url))

/**
 * 获取当前环境下生效的配置文件名
 */
function getConfFiles() {
  const script = process.env.npm_lifecycle_script as string
  const reg = /--mode ([\d_a-z]+)/
  const result = reg.exec(script)
  let mode = 'production'
  if (result) {
    mode = result[1] as string
  }
  return ['.env', '.env.local', `.env.${mode}`, `.env.${mode}.local`]
}

/**
 * Get the environment variables starting with the specified prefix
 * @param match prefix
 * @param confFiles ext
 */
async function loadEnv<T = Record<string, string>>(
  match = 'VITE_',
  confFiles = getConfFiles()
) {
  let envConfig = {}

  for (const confFile of confFiles) {
    try {
      const confFilePath = join(process.cwd(), confFile)
      if (existsSync(confFilePath)) {
        const envPath = await readFile(confFilePath, {
          encoding: 'utf8'
        })
        const env = dotenv.parse(envPath)
        envConfig = { ...envConfig, ...env }
      }
    } catch (error) {
      console.error(`Error while parsing ${confFile}`, error)
    }
  }
  const reg = new RegExp(`^(${match})`)
  Object.keys(envConfig).forEach((key) => {
    if (!reg.test(key)) {
      Reflect.deleteProperty(envConfig, key)
    }
  })
  return envConfig as T
}

async function loadAndConvertEnv(
  match = 'VITE_',
  confFiles = getConfFiles()
): Promise<
  {
    appTitle: string
    base: string
    port: number
  } & Partial<ApplicationPluginOptions>
> {
  const envConfig = (await loadEnv(match, confFiles)) as ImportMetaEnv

  const {
    VITE_APP_TITLE,
    VITE_BASE,
    VITE_COMPRESS,
    VITE_DEVTOOLS,
    VITE_MOCK_SERVER,
    VITE_PORT
  } = envConfig

  const compressTypes = (
    VITE_COMPRESS && VITE_COMPRESS !== 'none' ? VITE_COMPRESS : ''
  )
    .split(',')
    .filter((item) => item === 'brotli' || item === 'gzip')

  return {
    appTitle: getString(VITE_APP_TITLE, 'King Admin'),
    base: getString(VITE_BASE, '/'),
    compress: compressTypes.length > 0,
    compressTypes,
    devtools: getBoolean(VITE_DEVTOOLS),
    mockServe: getBoolean(VITE_MOCK_SERVER),
    port: getNumber(VITE_PORT, 5173)
  }
}

export { getConfFiles, loadAndConvertEnv, loadEnv }
