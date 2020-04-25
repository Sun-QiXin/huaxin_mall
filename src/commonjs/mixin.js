import {debounce} from "commonjs/utils";

/**
 * 抽取组件中的公共代码（混入）
 * @type {{mounted(): void}}
 */
export const itemImgListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      mixinRefresh: null
    }
  },
  mounted() {
    //1、监听GoodsListItem中的图片是否加载完成(使用自己封装的防抖函数控制执行次数)
    this.mixinRefresh = debounce(this.$refs.scroll.refresh, 100)

    this.itemImgListener = () => {
      //refresh():重新计算 better-scroll,   this.$refs.scroll：组件创建完成才能执行后面函数
      this.mixinRefresh();
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener);
  }
}
