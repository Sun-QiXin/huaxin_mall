import {request} from "./request";

//请求轮播图、推荐相关的数据
export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

//请求首页商品相关的数据
export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params:{
      type,
      page
    }
  })
}
