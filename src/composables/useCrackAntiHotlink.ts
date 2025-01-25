// 创建一个<meta>标签，用于设置 referrer 策略为 no-referrer，以解决防盗链问题
function createNoReferrer() {
  const metaAttributes = [
    { attr: 'name', value: 'referrer' },
    { attr: 'content', value: 'no-referrer' }
  ]
  const metaTag = document.createElement('meta')

  // 遍历属性列表，动态设置 meta 标签的属性
  metaAttributes.forEach(({ attr, value }) => {
    metaTag.setAttribute(attr, value)
  })

  return metaTag
}

export function useCrackAntiHotlink() {
  function appendNoReferrer() {
    document.head.append(createNoReferrer())
  }

  return { appendNoReferrer }
}
