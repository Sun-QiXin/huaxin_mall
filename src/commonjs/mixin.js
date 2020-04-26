import {debounce} from "commonjs/utils";
import BackTop from "components/common/backTop/BackTop";
/**
 * 抽取组件中的公共代码（混入）
 * 监听GoodsListItem中的图片是否加载完成
 * @type {{mounted(): void}}
 */
export const itemImgListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      //保存防抖过得刷新函数，可以在其他地方调用
      mixinRefresh: null
    }
  },
  mounted() {
    //1、监听GoodsListItem中的图片是否加载完成(使用自己封装的防抖函数控制执行次数)
    this.mixinRefresh = debounce(this.$refs.scroll.refresh, 200)

    this.itemImgListener = () => {
      //refresh():重新计算 better-scroll,   this.$refs.scroll：组件创建完成才能执行后面函数
      this.mixinRefresh();
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener);
  }
}

/**
 * 点击回到顶部的公共代码
 * @type {{components: {BackTop}, data(): {isShowBackTop: boolean}, methods: {backClick(): void}}}
 */
export const backTopMixin = {
  components:{
    BackTop
  },
  data() {
    return {
      //是否显示回到顶部按钮
      isShowBackTop: false
    }
  },
  methods:{
    //2、监听组件的点击（需要在click后面加native）
    backClick() {
      //访问Scroll组件的方法
      this.$refs.scroll && this.$refs.scroll.scrollTo(0, 0, 1000);
    },
  }
}
