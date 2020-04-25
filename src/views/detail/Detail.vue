<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar"
                    @detailTitleClick="detailTitleClick" :titleCurrentIndex="titleCurrentIndex"/>
    <scroll class="content" ref="scroll" @scroll="ContentScrollY" :probe-type="3">
      <detail-swiper :top-images="topImages" @imgLoad="detailSwiperImgLoad"/>
      <detail-base-info :goods-info="goodsInfo"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="detailGoodsInfoImageLoad"/>
      <detail-param-info :param-info="parameterInfo" ref="detailParamInfo"/>
      <detail-comment-info :comment-info="commentInfo" ref="detailCommentInfo"/>
      <goods-list :goods="recommend" ref="goodsList"/>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from "./childComponents/DetailNavBar";
  import DetailSwiper from "./childComponents/DetailSwiper";
  import DetailBaseInfo from "./childComponents/DetailBaseInfo";
  import DetailShopInfo from "./childComponents/DetailShopInfo";
  import DetailGoodsInfo from "./childComponents/DetailGoodsInfo";
  import DetailParamInfo from "./childComponents/DetailParamInfo";
  import DetailCommentInfo from "./childComponents/DetailCommentInfo";

  import BScroll from "components/common/scroll/Scroll.vue"
  import GoodsList from "components/content/goods/GoodsList";
  import GoodsListItem from "components/content/goods/GoodsListItem";

  import {getDetailData, getRecommend, GoodsInfo, Shop, GoodsParam} from "network/detail";
  import Scroll from "components/common/scroll/Scroll";
  import {itemImgListenerMixin} from "commonjs/mixin";
  import {debounce} from "commonjs/utils";

  export default {
    name: "Detail",
    components: {
      Scroll,
      BScroll,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      GoodsListItem
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goodsInfo: {},
        shop: {},
        detailInfo: {},
        parameterInfo: {},
        commentInfo: {},
        recommend: [],
        themeTopYs: [],
        getThemeTopY: null,
        titleCurrentIndex: 0
      }
    },
    methods: {
      //1、监听detailGoodsInfo组件中的图片是否加载完毕
      detailGoodsInfoImageLoad() {
        //1)使用mixin中的保存的防抖动函数
        this.mixinRefresh();

        //2)每张图片加载完后调用getThemeTopY赋值
        this.getThemeTopY();
      },

      //2、监听detailSwiperImgLoad组件中的轮播图片是否加载完毕
      detailSwiperImgLoad() {
        //使用mixin中的保存的防抖动函数
        this.mixinRefresh();
      },

      //3、监听标题的点击,并滚动到点击标题的位置
      detailTitleClick(index) {
        this.$refs.scroll.scrollTo(0, (this.themeTopYs[index] + 44), 500);
      },

      //4、监听滚动的位置(设置在什么范围内显示什么标题)
      ContentScrollY(position) {
        if (parseInt(position.y) < this.themeTopYs[0] && parseInt(position.y) > this.themeTopYs[1]) {
          this.titleCurrentIndex = 0;
        } else if (parseInt(position.y) < this.themeTopYs[1] && parseInt(position.y) > this.themeTopYs[2]) {
          this.titleCurrentIndex = 1;
        } else if (parseInt(position.y) < this.themeTopYs[2] && parseInt(position.y) > this.themeTopYs[3]) {
          this.titleCurrentIndex = 2;
        } else {
          this.titleCurrentIndex = 3;
        }
      }
    },
    created() {
      //1、保存传入的iid
      this.iid = this.$route.params.iid;

      //2、根据iid请求详情数据
      getDetailData(this.iid).then(res => {
        const data = res.result;
        //1)获取顶部轮播图片数据
        this.topImages = data.itemInfo.topImages;

        //2)将商品信息封装到GoodsInfo类中
        this.goodsInfo = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services);

        //3)将店铺信息封装到Shop类中
        this.shop = new Shop(data.shopInfo);

        //4)保存商品的详情数据
        this.detailInfo = data.detailInfo;

        //5)将参数信息封装到GoodsParam类中
        this.parameterInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

        //6)保存评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0];
        }

        //7给getThemeTopY赋值（使用防抖函数）
        this.getThemeTopY = debounce(() => {
          //获取每个组件距离顶部的Y值
          this.themeTopYs = [];
          this.themeTopYs.push(0);
          this.themeTopYs.push(-this.$refs.detailParamInfo.$el.offsetTop);
          this.themeTopYs.push(-this.$refs.detailCommentInfo.$el.offsetTop);
          this.themeTopYs.push(-this.$refs.goodsList.$el.offsetTop);
          console.log(this.themeTopYs);
        }, 300)
      })

      //3、获取推荐数据
      getRecommend().then(res => {
        this.recommend = res.data.list;
      })
    },

    //使用公共代码（混入）
    mixins: [itemImgListenerMixin],

    destroyed() {
      //1、取消全局事件的监听
      this.$bus.$off('itemImageLoad', this.itemImgListener);
    },
    mounted() {

    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .detail-nav-bar {
    position: relative;
    background-color: #fff;
  }

  .content {
    height: calc(100vh - 44px);
    overflow: hidden;
  }
</style>
