import type { Preferences } from './types'

const defaultPreferences: Preferences = {
  app: {
    defaultAvatar:
      'https://article.biliimg.com/bfs/article/88558ca13036274ab3714dca1bdb5680627872080.jpg@300w_300h_1e_1c.webp',
    dynamicTitle: true,
    isMobile: false,
    locale: 'zh-CN',
    name: 'King Admin System'
  },
  breadcrumb: {
    enable: true,
    hideOnlyOne: false,
    showHome: false,
    showIcon: true,
    styleType: 'normal'
  },
  footer: {
    enable: false,
    fixed: false
  },
  header: {
    enable: true,
    hidden: false,
    mode: 'fixed'
  },
  logo: {
    enable: true,
    source:
      'https://i0.hdslb.com/bfs/article/4e325007b5d67b61c5b510c2a409c81e627872080.png@360w_360h_1e_1c.webp'
  },
  navigation: {
    accordion: true,
    styleType: 'rounded'
  },
  sidebar: {
    collapsed: false,
    collapsedShowTitle: false,
    enable: true,
    expandOnHover: true,
    hidden: false,
    width: 224
  },
  tabbar: {
    draggable: true,
    enable: true,
    height: 38,
    keepAlive: true,
    persist: true,
    showIcon: true,
    showMaximize: true,
    showMore: true,
    styleType: 'chrome'
  },
  theme: {
    mode: 'light'
  }
}

export { defaultPreferences }
