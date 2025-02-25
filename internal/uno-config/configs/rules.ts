import type { UserConfig } from 'unocss'

/* Border */
const colorPattern = `(?:\\$(H:)?[a-zA-Z-_][\\w-]*|rgba?\\([\\d\\s.,%]+\\)|hsla?\\([\\d\\s.,%]+\\)|#[0-9a-fA-F]{3,8}|[a-zA-Z]+)`
const borderRegex = new RegExp(`^(b|bt|bb|bl|br)-(\\d+)-(${colorPattern})$`)
const generateBorderStyle = (match: RegExpMatchArray, borderType: string) => {
  const size = match[2] // 边框宽度

  const colorStr = (cStr: string) => {
    const varStart = (prefix: string) => cStr.startsWith(prefix)

    if (varStart('$H:')) {
      return `hsl(var(--${cStr.slice(3)}))`
    } else if (varStart('$')) {
      return `var(--${cStr.slice(1)})`
    } else {
      return cStr
    }
  }
  const color = colorStr(match[3] as string)

  const directionMap: Record<string, string> = {
    b: 'border',
    bb: 'border-bottom',
    bl: 'border-left',
    br: 'border-right',
    bt: 'border-top'
  }

  const borderProp = directionMap[borderType]
  const borderStyle = { [borderProp as string]: `${size}px solid ${color}` }
  return borderStyle
}

const rulesConfig: UserConfig = {
  rules: [
    [borderRegex, (match) => generateBorderStyle(match, match[1] as string)]
  ]
}

export { rulesConfig }
