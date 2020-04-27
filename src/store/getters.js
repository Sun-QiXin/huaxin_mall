export default {
  /**
   * 返回购物车中有多少个商品
   * @param state
   * @returns {number}
   */
  shoppingCartLength(state){
    return state.shoppingCartGoods.length;
  },

  /**
   * 返回购物车列表数据
   * @param state
   * @returns {[]}
   */
  shoppingCartList(state){
    return state.shoppingCartGoods;
  }
}
