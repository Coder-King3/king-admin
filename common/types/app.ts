/**
 * 主题模式
 * dark 暗黑
 * light 白天
 * auto 自动
 */
type ThemeModeType = 'auto' | 'dark' | 'light'

/**
 * 主题组件ui大小
 * default 默认
 * large 大
 * small 小
 */
type ThemeUiSize = 'default' | 'large' | 'small'

/**
 * 登录过期模式
 * modal 弹窗模式
 * page 页面模式
 */
type LoginExpiredModeType = 'modal' | 'page'

/**
 * 面包屑样式
 * background 背景
 * normal 默认
 */
type BreadcrumbStyleType = 'background' | 'normal'

/**
 * 导航风格
 * plain 朴素
 * rounded 圆润
 */
type NavigationStyleType = 'plain' | 'rounded'

/**
 * 顶栏显示模式
 * auto 自动
 * auto-scroll 自动滚动
 * fixed 固定
 * static 静态
 */
type LayoutHeaderModeType = 'auto' | 'auto-scroll' | 'fixed' | 'static'

/**
 * 标签栏风格
 * brisk 轻快
 * card 卡片
 * chrome 谷歌
 * plain 朴素
 */
type TabsStyleType = 'brisk' | 'card' | 'chrome' | 'plain'

export type {
  BreadcrumbStyleType,
  LayoutHeaderModeType,
  LoginExpiredModeType,
  NavigationStyleType,
  TabsStyleType,
  ThemeModeType,
  ThemeUiSize
}
