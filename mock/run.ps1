function hasOutput {
  param (
    [string]$path = ".\.output\app.mjs"  # 默认路径
  )

  return Test-Path $path  # 直接返回布尔值
}

function runApp {
  if (-not (hasOutput)) {
    pnpm build
  }
 
  node index.js
}

runApp
