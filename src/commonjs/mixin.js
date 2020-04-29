import {debounce} from "commonjs/utils";
import BackTop from "components/common/backTop/BackTop";
import TabControl from "../components/content/tabControl/TabControl";
import {POP, SELL, NEW} from "./const";

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
    this.mixinRefresh = debounce(this.$refs.scroll.refresh, 50)

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
  components: {
    BackTop
  },
  data() {
    return {
      //是否显示回到顶部按钮
      isShowBackTop: false
    }
  },
  methods: {
    //2、监听组件的点击（需要在click后面加native）
    backClick() {
      //访问Scroll组件的方法
      this.$refs.scroll && this.$refs.scroll.scrollTo(0, 0, 1000);
    },
  }
}

/**
 * tabControl导航栏的公共代码
 * @type {{data: (function(): {currentType: string}), methods: {tabClick(*): void}}}
 */
export const tabControlMixin = {
  components: {
    TabControl
  },
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    //1、监听tabControl的点击
    tabClick(index) {
      //调用此方法来保持两个tabControl的选项一致
      this._tabClick(index);

      switch (index) {
        case 0:
          //如果当前页面不是正在显示的就滚动到所点击标签的起始位置
          if (this.currentType != POP && this.isTabFixed) {
            this.$refs.scroll && this.$refs.scroll.scrollTo(0, (-this.tabOffsetTop), 0);
          }
          this.currentType = POP;
          break;

        case 1:
          if (this.currentType != NEW && this.isTabFixed) {
            this.$refs.scroll && this.$refs.scroll.scrollTo(0, (-this.tabOffsetTop), 0);
          }
          this.currentType = NEW;
          break;

        case 2:
          if (this.currentType != SELL && this.isTabFixed) {
            this.$refs.scroll && this.$refs.scroll.scrollTo(0, (-this.tabOffsetTop), 0);
          }
          this.currentType = SELL;
          break;
      }
    }
  }
}
