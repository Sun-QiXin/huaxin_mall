<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar"
                    @detailTitleClick="detailTitleClick" ref="detailNavBar"/>
    <scroll class="content" ref="scroll" @scroll="ContentScrollY" :probe-type="3">
      <detail-swiper :top-images="topImages" @imgLoad="detailSwiperImgLoad"/>
      <detail-base-info :goods-info="goodsInfo"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="detailGoodsInfoImageLoad"/>
      <detail-param-info :param-info="parameterInfo" ref="detailParamInfo"/>
      <detail-comment-info :comment-info="commentInfo" ref="detailCommentInfo"/>
      <goods-list :goods="recommend" ref="goodsList"/>
    </scroll>
    <detail-bottom-bar @openShoppingCart="openShoppingCart"/>
    <back-top v-show="isShowBackTop" @click.native="backClick"/>
    <detail-shopping-cart :shopping-cart-info="ShoppingCartInfo" ref="detailShoppingCart"
                          @addShoppingCart="addShoppingCart"/>

    <div v-show="isShowAddShoppingCartMsg" class="addShoppingCartMsg"><span>{{addShoppingCartMsg}}</span></div>
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
  import DetailBottomBar from "./childComponents/DetailBottomBar";
  import DetailShoppingCart from "./childComponents/DetailShoppingCart";

  import BScroll from "components/common/scroll/Scroll.vue"
  import GoodsList from "components/content/goods/GoodsList";
  import GoodsListItem from "components/content/goods/GoodsListItem";

  import {getDetailData, getRecommend, GoodsInfo, Shop, GoodsParam} from "network/detail";
  import Scroll from "components/common/scroll/Scroll";
  import {itemImgListenerMixin, backTopMixin} from "commonjs/mixin";
  import {debounce} from "commonjs/utils";
  import {TOP_DISTANCE} from "../../commonjs/const";

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
      DetailBottomBar,
      DetailShoppingCart,
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
        titleCurrentIndex: 0,
        ShoppingCartInfo: {},
        addShoppingCartMsg: '✔加入购物车成功！',
        isShowAddShoppingCartMsg: false
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
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500);
      },

      //4、监听滚动的位置(设置在什么范围内显示什么标题)
      ContentScrollY(position) {
        //这种方法不够灵活，而且调用频繁
        /*if (parseInt(position.y) <= -this.themeTopYs[0] && parseInt(position.y) > -this.themeTopYs[1] || parseInt(position.y) > -this.themeTopYs[0]) {
          this.$refs.detailNavBar.currentIndex = 0;
        } else if (parseInt(position.y) <= -this.themeTopYs[1] && parseInt(position.y) > -this.themeTopYs[2]) {
          this.$refs.detailNavBar.currentIndex = 1;
        } else if (parseInt(position.y) <= -this.themeTopYs[2] && parseInt(position.y) > -this.themeTopYs[3]) {
          this.$refs.detailNavBar.currentIndex = 2;
        } else {
          this.$refs.detailNavBar.currentIndex = 3;
        }*/

        //1)滑动到什么位置与顶部标题对应
        const positionY = -position.y;
        for (let i = 0; i < this.themeTopYs.length - 1; i++) {
          if (this.titleCurrentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
            this.titleCurrentIndex = i;
            //拿到子组件传下标值
            this.$refs.detailNavBar.currentIndex = this.titleCurrentIndex;
          }
        }

        //2)、监听BackTop是否显示
        this.isShowBackTop = position.y < -TOP_DISTANCE;
      },

      //5、打开购物车
      openShoppingCart() {
        this.$refs.detailShoppingCart.isShowShoppingCart = true;
      },

      //6、将选中的商品添加到购物车
      addShoppingCart() {
        //1)获取购物车需要展示的信息
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goodsInfo.title;
        product.desc = this.goodsInfo.desc;
        product.iid = this.iid;
        product.currentCounts = this.$refs.detailShoppingCart.currentCounts;
        product.realPrice = this.$refs.detailShoppingCart.nowPrice;
        product.productStyleMsg = this.$refs.detailShoppingCart.productStyleMsg;
        product.productSizeMsg = this.$refs.detailShoppingCart.productSizeMsg;

        //2)点击确定后关闭购物车，显示提示信息
        this.$refs.detailShoppingCart.isShowShoppingCart = false;
        //显示信息
        this.isShowAddShoppingCartMsg = true;
        //过500ms隐藏
        setTimeout(()=>{
          this.isShowAddShoppingCartMsg = false;
        },800)

        //3)将商品加入到购物车
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

        //7)保存购物车信息
        this.ShoppingCartInfo = data.skuInfo;

        //8给getThemeTopY赋值（使用防抖函数）
        this.getThemeTopY = debounce(() => {
          //获取每个组件距离顶部的Y值
          this.themeTopYs = [];
          this.themeTopYs.push(0);
          this.themeTopYs.push(this.$refs.detailParamInfo.$el.offsetTop);
          this.themeTopYs.push(this.$refs.detailCommentInfo.$el.offsetTop);
          this.themeTopYs.push(this.$refs.goodsList.$el.offsetTop);
          this.themeTopYs.push(Number.MAX_VALUE);
        }, 300)
      })

      //3、获取推荐数据
      getRecommend().then(res => {
        this.recommend = res.data.list;
      })
    },

    //使用公共代码（混入）
    mixins: [itemImgListenerMixin, backTopMixin],

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
    position: relative;
    height: calc(100vh - 93px);
    overflow: hidden;
  }
  .addShoppingCartMsg{
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 49px;
    right: 0;
    left: 0;
    height: calc(100% - 44px - 49px);
    background-color: rgba(0,0,0,0.7);
  }
  .addShoppingCartMsg span{
    color: white;
    display: block;
    width: 50%;
    height:26px;
    line-height: 26px;
    text-align: center;
    border-radius: 7px;
    background-image: linear-gradient(90deg,rgba(7, 153, 146,.8),rgba(96, 163, 188,.7));
  }

</style>
