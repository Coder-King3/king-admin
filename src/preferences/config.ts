import type { Preferences } from './types'

const defaultPreferences: Preferences = {
  app: {
    locale: 'zh-CN',
    defaultAvatar:
      'https://article.biliimg.com/bfs/article/88558ca13036274ab3714dca1bdb5680627872080.jpg@300w_300h_1e_1c.webp',
    dynamicTitle: true,
    isMobile: false,
    name: 'King Admin System'
  },
  theme: {
    mode: 'light'
  }
}

export { defaultPreferences }
