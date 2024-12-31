export function resultSuccess<T = any>(
  result: Record<string, T> | null | undefined,
  { message = 'ok' } = {}
) {
  return {
    code: 0,
    result,
    message,
    type: 'success'
  }
}

export function resultError(
  message = 'Request failed',
  { code = -1, result = null } = {}
) {
  return {
    code,
    result,
    message,
    type: 'error'
  }
}
