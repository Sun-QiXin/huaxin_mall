<template>
  <div id="home">
    <nav-bar class="home-nav-bar">
      <div slot="nav-bar-center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"/>
    <home-recommend-view :recommends="recommends"/>
    <home-feature-view/>
    <tab-control class="tab-control"
                 :titles="[`流行`,`新款`,`精选`]" @tabClick="tabClick"/>
    <goods-list :goods="showGoods"/>
  </div>
</template>

<script>
  import HomeSwiper from "./ChildComponents/HomeSwiper";
  import HomeRecommendView from "./ChildComponents/HomeRecommendView";
  import HomeFeatureView from "./ChildComponents/HomeFeatureView";

  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";

  import {getHomeMultidata, getHomeGoods} from "network/home";

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      HomeRecommendView,
      HomeFeatureView,
      NavBar,
      TabControl,
      GoodsList
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
        currentType: 'pop'
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
</style>
