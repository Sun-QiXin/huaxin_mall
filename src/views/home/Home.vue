<template>
  <div id="home">
    <nav-bar class="home-nav-bar">
      <div slot="nav-bar-center">购物街</div>
    </nav-bar>

    <div v-show="isShowRefreshMsg" class="refreshMsg">{{msg}}</div>
    <scroll class="content" ref="scroll"
            :probe-type="3" :pull-up-load=true :pull-down-refresh=true
            @scroll="ContentScroll"
            @pullingUp="loadMore"
            @pullingDown="homePullingDown">
      <home-swiper :banners="banners"/>
      <home-recommend-view :recommends="recommends"/>
      <home-feature-view/>
      <tab-control class="tab-control"
                   :titles="[`流行`,`新款`,`精选`]" @tabClick="tabClick"/>
      <goods-list :goods="showGoods"/>
      <div class="refreshMsg">上拉加载更多</div>
    </scroll>
    <div class="refreshMsg">{{msg}}</div>
    <back-top v-show="isShowBackTop" @click.native="backClick"/>
  </div>
</template>

<script>
  import HomeSwiper from "./ChildComponents/HomeSwiper";
  import HomeRecommendView from "./ChildComponents/HomeRecommendView";
  import HomeFeatureView from "./ChildComponents/HomeFeatureView";

  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/common/backTop/BackTop";

  import {getHomeMultidata, getHomeGoods} from "network/home";

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      HomeRecommendView,
      HomeFeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        isShowBackTop: false,
        msg: '下拉刷新',
        isMsg: true,
        isShowRefreshMsg: true
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list;
      }
    },
    methods: {
      /**
       * 事件监听相关的方法
       */
      //1、监听tabControl的点击
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break;

          case 1:
            this.currentType = 'new';
            break;

          case 2:
            this.currentType = 'sell';
            break;
        }
      },
      //监听组件的点击（需要在click后面加native）
      backClick() {
        //访问Scroll组件的方法
        this.$refs.scroll && this.$refs.scroll.scrollTo(0, 0, 1000);
      },

      //监听滚动的位置（使用scroll组件传过来的事件）
      ContentScroll(position) {
        if (this.isMsg && position.y > 40) {
          this.isMsg = false;
          this.msg = "松开立即刷新"
        } else if (position.y < 0) {
          this.isShowRefreshMsg = false;
        }else {
          this.isShowRefreshMsg = true;
        }
        this.isShowBackTop = position.y < -2000
      },

      //监听上拉事件（使用scroll组件传过来的事件）
      loadMore() {
        this.getHomeGoods(this.currentType);
      },

      //监听下拉事件（使用scroll组件传过来的事件）
      homePullingDown() {
        this.msg = "刷新中......"
        setTimeout(() => {
          this.msg = "刷新成功！"
          location.reload();
        }, 500)
      },

      /**
       * 网络请求相关的方法
       */
      getHomeMultidata() {
        //1、请求多个数据
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        //2、请求商品数据
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;
        })
      }
    },
    //组件创建好就请求数据
    created() {
      //1、请求多个数据
      this.getHomeMultidata();

      //2、请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');

    },
    mounted() {
      //3、监听GoodsListItem中的图片是否加载完成
      this.$bus.$on('itemImageLoad', () => {
        //重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常。
        /*如果this.$refs.scroll为null他是不会执行后面的*/
        this.$refs.scroll && this.$refs.scroll.refresh();
      })
    }
  }
</script>

<style scoped>
  #home {
    margin-top: 44px;
    margin-bottom: 49px;
  }

  .home-nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
    color: white;
    background-color: var(--color-tint);
  }

  .tab-control {
    position: sticky;
    top: 44px;
  }

  .content {
    height: calc(100vh - 93px);
    overflow: hidden;
  }

  .refreshMsg {
    width: 100vw;
    height: 40px;
    position: absolute;
    line-height: 40px;
    text-align: center;
    color: rgba(0, 0, 0, 0.5);
    font-style: oblique;
  }

</style>
