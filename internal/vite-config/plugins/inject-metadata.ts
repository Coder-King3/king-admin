import type { PluginOption } from 'vite'

import { dateUtil, readPackageJSON } from '../utils'

/**
 * 用于注入项目信息
 */
async function viteMetadataPlugin(
  root = process.cwd()
): Promise<PluginOption | undefined> {
  const { author, description, homepage, license, version } =
    await readPackageJSON(root)

  const buildTime = dateUtil().format('YYYY-MM-DD HH:mm:ss')

  return {
    async config() {
      const isAuthorObject = typeof author === 'object'
      const authorName = isAuthorObject ? author.name : author
      const authorEmail = isAuthorObject ? author.email : null
      const authorUrl = isAuthorObject ? author.url : null

      const metadata = {
        authorEmail,
        authorName,
        authorUrl,
        buildTime,
        description,
        homepage,
        license,
        version
      }

      return {
        define: {
          __KING_ADMIN_METADATA__: JSON.stringify(metadata),
          'import.meta.env.VITE_APP_VERSION': JSON.stringify(version)
        }
      }
    },
    enforce: 'post',
    name: 'vite:inject-metadata'
  }
}

export { viteMetadataPlugin }
