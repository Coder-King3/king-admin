import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

/**
 * 初始化 NProgress 配置
 */
function loadNprogress() {
  NProgress.configure({
    easing: 'ease', // 动画方式
    speed: 300, // 递增进度条的速度
    showSpinner: true, // 是否显示加载ico
    trickleSpeed: 180, // 自动递增间隔
    minimum: 0.3 // 初始化时的最小百分比
  })
  return NProgress
}

function startProgress() {
  const nprogress = loadNprogress()
  nprogress.start()
}

function stopProgress() {
  const nprogress = loadNprogress()
  nprogress.done()
}

export { startProgress, stopProgress }
