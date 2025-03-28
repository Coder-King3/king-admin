/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
const { createServer } = require('node:http')

const { toNodeListener } = require('h3')

async function main() {
  try {
    const { app } = await import('./.output/app.mjs')

    const server = createServer(toNodeListener(app))
    const port = process.env.PORT || 3065

    server.listen(port, () => {
      console.log(`➜  H3 Mock Server:  http://localhost:${port}/api`)
    })
  } catch (error) {
    console.log(`App not found: ${error.message}`)
  }
}

main()
