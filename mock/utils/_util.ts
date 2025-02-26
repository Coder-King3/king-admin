/* Request Params */
export interface requestParams {
  body: any
  headers?: { authorization?: string }
  method: string
  query: any
}

/* Prefix */
// 配置应与 env VITE_BASE_API_URL 一致
const prefix = '/dev-api'
export function prependPrefix(url: string): string {
  return prefix + url
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
