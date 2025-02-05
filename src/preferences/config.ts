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
  },
  logo: {
    enable: true,
    source:
      'https://i0.hdslb.com/bfs/article/4e325007b5d67b61c5b510c2a409c81e627872080.png@360w_360h_1e_1c.webp'
  }
}

export { defaultPreferences }
