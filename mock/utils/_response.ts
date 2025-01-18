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

export function pagination<T = any>(
  pageNo: number,
  pageSize: number,
  array: T[]
): T[] {
  const offset = (pageNo - 1) * Number(pageSize)
  return offset + Number(pageSize) >= array.length
    ? array.slice(offset)
    : array.slice(offset, offset + Number(pageSize))
}
