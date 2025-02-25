import {
  disableds,
  ignores,
  imports,
  javascript,
  perfectionist,
  prettier,
  typescript,
  unocss,
  vue
} from './configs/index.mjs'

function defineConfig(config = []) {
  const configs = [
    disableds(),
    ignores(),
    imports(),
    javascript(),
    perfectionist(),
    prettier(),
    typescript(),
    unocss(),
    vue(),
    ...config
  ]

  return configs.flat()
}

export { defineConfig }
