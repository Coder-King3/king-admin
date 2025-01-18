import dayjs from 'dayjs'

function formatDate(time: number | string, format = 'YYYY-MM-DD') {
  try {
    const date = dayjs(time)
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

export { formatDate, formatDateTime }
