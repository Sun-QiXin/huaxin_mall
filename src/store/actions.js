export default {
  /**
   * 添加商品至全局变量中，将每个功能分发出去分别执行
   * @param context
   * @param payload
   */
  addShoppingCartGoods(context, payload) {
    return new Promise((resolve, reject) => {
      //1、判断payload对象是否为空
      if (Object.keys(payload).length === 0) {
        reject('加入购物车失败！')
      } else {
        //2、查找之前数组中是否有该商品
        let oldProduct = context.state.shoppingCartGoods.find(item => {
          //如果id、颜色、尺吗都一样就判断为同一商品
          return item.iid === payload.iid && item.productStyleMsg === payload.productStyleMsg && item.productSizeMsg === payload.productSizeMsg
        })

        //3、oldProduct有值则添加新的数量，否则直接添加数组
        if (oldProduct) {
          //如果需要传多个参数以对象的形式传送
          context.commit('addCurrentCounts', {payload, oldProduct});
          resolve('商品已存在！数量加' + payload.currentCounts);
        } else {
          context.commit('addGoods', payload);
          resolve('✔添加购物车成功！');
        }
      }
    })
  }
}
