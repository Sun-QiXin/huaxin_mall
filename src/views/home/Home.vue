<template>
  <div id="home">
    <nav-bar class="home-nav-bar">
      <div slot="nav-bar-center">购物街</div>
    </nav-bar>

    <div v-show="isShowRefreshMsg" class="refreshMsg">{{msg}}</div>
    <tab-control v-show="isTabFixed" class="tab-control tab-control2"
                 :titles="[`流行`,`新款`,`精选`]" @tabClick="tabClick" ref="tabControl1"/>

    <scroll class="content" ref="scroll"
            :probe-type="3" :pull-up-load=true :pull-down-refresh=true :pull-down-refresh-stop=40
            @scroll="ContentScroll"
            @pullingUp="loadMore"
            @pullingDown="homePullingDown">
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"/>
      <home-recommend-view :recommends="recommends"/>
      <home-feature-view/>
      <tab-control class="tab-control"
                   :titles="[`流行`,`新款`,`精选`]" @tabClick="tabClick" ref="tabControl2"/>
      <goods-list :goods="showGoods"/>
      <div class="refreshMsg" v-show="isShowBackTop">上拉加载更多</div>
    </scroll>

    <back-top v-show="isShowBackTop" @click.native="backClick"/>
  </div>
</template>

<script>
  //子组件
  import HomeSwiper from "./childComponents/HomeSwiper";
  import HomeRecommendView from "./childComponents/HomeRecommendView";
  import HomeFeatureView from "./childComponents/HomeFeatureView";

  //公共组件
  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/common/backTop/BackTop";

  //封装的工具函数
  import {getHomeMultidata, getHomeGoods} from "network/home";
  import {itemImgListenerMixin} from "commonjs/mixin";


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
        msg: '↓下拉刷新',
        isMsg: true,
        isShowRefreshMsg: true,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
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
            //如果当前页面不是正在显示的就滚动到所点击标签的起始位置
            if (this.currentType != 'pop') {
              this.$refs.scroll && this.$refs.scroll.scrollTo(0, (-this.tabOffsetTop) + 43, 0);
            }
            this.currentType = 'pop';
            break;

          case 1:
            if (this.currentType != 'new') {
              this.$refs.scroll && this.$refs.scroll.scrollTo(0, (-this.tabOffsetTop) + 43, 0);
            }
            this.currentType = 'new';
            break;

          case 2:
            if (this.currentType != 'sell') {
              this.$refs.scroll && this.$refs.scroll.scrollTo(0, (-this.tabOffsetTop) + 43, 0);
            }
            this.currentType = 'sell';
            break;
        }
        //让两个组件索引值保持一致
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },

      //2、监听组件的点击（需要在click后面加native）
      backClick() {
        //访问Scroll组件的方法
        this.$refs.scroll && this.$refs.scroll.scrollTo(0, 0, 1000);
      },

      //3、监听滚动的位置（使用scroll组件传过来的事件）
      ContentScroll(position) {
        //1)、改变上拉刷新时的文字
        if (this.isMsg && position.y > 40) {
          this.isMsg = false;
          this.msg = "松开立即刷新"
        } else if (position.y <= 0) {
          this.msg = '↓下拉刷新';
          this.isMsg = true;
          this.isShowRefreshMsg = false;
        } else {
          this.isShowRefreshMsg = true;
        }

        //2)、监听BackTop是否显示
        this.isShowBackTop = position.y < -2000

        //3)、判断tabControl是否需要吸顶显示
        this.isTabFixed = this.tabOffsetTop - 41 <= (-position.y);
      },

      //4、监听上拉事件（使用scroll组件传过来的事件）
      loadMore() {
        this.getHomeGoods(this.currentType);
      },

      //5、监听下拉事件（使用scroll组件传过来的事件）
      homePullingDown() {
        this.msg = "刷新中......"
        setTimeout(() => {
          this.msg = "刷新成功✔"
          location.reload();
        }, 500)
      },

      //6、获取tabControl组件距离顶部的距离,所有的组件都有一个$el属性，用于拿到组件中的元素
      //需要监听上半部分的图片加载完成
      swiperImgLoad() {
        //mixin中的防抖
        this.mixinRefresh();
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
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

    //使用公共代码（混入）
    mixins: [itemImgListenerMixin],

    //进入本组件时触发
    activated() {
      //一进入组件就滚动到离开时保存的位置
      this.$refs.scroll && this.$refs.scroll.scrollTo(0, this.saveY, 10);
      //refresh():重新计算 better-scroll,
      this.$refs.scroll && this.$refs.scroll.refresh();
    },
    //离开本组件时触发
    deactivated() {
      //1、保存离开时的位置
      this.saveY = this.$refs.scroll.getScrollY();

      //2、取消全局事件的监听
      this.$bus.$off('itemImageLoad', this.itemImgListener);
    }
  }
</script>

<style scoped>
  #home {
    margin-bottom: 49px;
    overflow: hidden;
  }

  .home-nav-bar {
    color: white;
    background-color: var(--color-tint);
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }

  .tab-control2 {
    position: fixed;
    margin-top: -1px;
    width: 100%;
  }

  .content {
    height: calc(100vh - 93px);
    overflow: hidden;
  }

  .refreshMsg {
    width: 100%;
    height: 40px;
    position: absolute;
    line-height: 40px;
    text-align: center;
    color: rgba(0, 0, 0, 0.5);
    font-style: oblique;
  }

</style>
