export function useResponseSuccess<T = any>(data: T) {
  return {
    code: 0,
    data,
    message: 'ok',
    type: 'success'
  }
}

export function useResponseError(message: string) {
  return {
    code: -1,
    data: null,
    message,
    type: 'error'
  }
}
