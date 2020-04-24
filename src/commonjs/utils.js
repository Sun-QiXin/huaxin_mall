/**
 * 防抖函数(控制一些函数执行的次数)
 * 如获取加载图片是否完成的函数没次请求会被执行30次，消耗性能
 * @param func
 * @param delay
 * @returns {function(...[*]=)}
 */
export function debounce(func, delay) {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay)
  }
}
