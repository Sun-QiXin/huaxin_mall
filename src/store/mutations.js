export default {
  //mutations尽量做单一的事情，调试的时候好追踪
  /**
   * 相同商品数量加一
   * @param state
   * @param payload   payload用户传进来的商品，oldProduct数组中原有的商品
   */
  addCurrentCounts(state, payload) {
    payload.oldProduct.currentCounts += payload.payload.currentCounts;
  },

  /**
   * 将不同商品添加到数组中
   * @param state
   * @param payload 商品对象
   */
  addGoods(state, payload) {
    payload.checked = false;
    state.shoppingCartGoods.push(payload);
  },

  /**
   * 更新商品中Checked的值
   */
  updateChecked(state, payload) {
    //1、查找到当前要修改的商品
    let oldProduct = state.shoppingCartGoods.find(item => {
      return item.iid === payload.item.iid && item.productStyleMsg === payload.item.productStyleMsg && item.productSizeMsg === payload.item.productSizeMsg
    })
    //2、改变checked值
    oldProduct.checked = payload.checked;
  },

  /**
   * 更新商品中currentCounts的值
   */
  updateCounts(state, payload) {
    //1、查找到当前要修改的商品
    let oldProduct = state.shoppingCartGoods.find(item => {
      return item.iid === payload.item.iid && item.productStyleMsg === payload.item.productStyleMsg && item.productSizeMsg === payload.item.productSizeMsg
    })
    //2、改变checked值
    oldProduct.currentCounts += payload.number;
  }
}
