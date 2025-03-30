/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */

const { listenAndWatch } = require('listhen')

async function runDevServer(entryPath, devServerOptions) {
  await listenAndWatch(entryPath, devServerOptions)
}

// 启动监听服务
runDevServer('./app.ts', {
  port: 3065
})
