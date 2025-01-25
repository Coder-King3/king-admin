import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

// 支持 UTC 时间处理。
dayjs.extend(utc)
// 支持时区管理。
dayjs.extend(timezone)
// 设置默认时区 UTC+8
dayjs.tz.setDefault('Asia/Shanghai')

const dateUtil = dayjs

function formatDate(time: number | string, format = 'YYYY-MM-DD') {
  try {
    const date = dateUtil(time)
    if (!date.isValid()) {
      throw new Error('Invalid date')
    }
    return date.format(format)
  } catch (error) {
    console.error(`Error formatting date: ${error}`)
    return time
  }
}

function formatDateTime(time: number | string) {
  return formatDate(time, 'YYYY-MM-DD HH:mm:ss')
}

export { dateUtil, formatDate, formatDateTime }
