import {request} from "./request";

/**
 * 请求轮播图、推荐相关的数据
 * @returns {*}
 */
export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

/**
 * 请求首页商品相关的数据
 * @param type
 * @param page
 * @returns {*}
 */
export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params:{
      type,
      page
    }
  })
}
