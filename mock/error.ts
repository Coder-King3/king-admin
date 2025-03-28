import type { AppOptions } from 'h3'

const errorHandler: AppOptions['onError'] = function (error, event) {
  event.node.res.end(`[Error Handler] ${error.stack}`)
}

export default errorHandler
