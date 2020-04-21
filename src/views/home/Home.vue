<template>
  <div>
    <nav-bar class="home-nav-bar"><div slot="nav-bar-center">购物街</div></nav-bar>
    <home-swiper :banners="banners"/>
    <home-recommend-view :recommends="recommends"/>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import HomeSwiper from "./ChildComponents/HomeSwiper";
  import HomeRecommendView from "./ChildComponents/HomeRecommendView";

  import {getHomeMultidata} from "network/home";

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      HomeRecommendView
    },
    data() {
      return {
        banners: [],
        recommends:[]
      }
    },
    //组件创建好就请求数据
    created() {
      //1、请求多个数据
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    }
  }
</script>

<style scoped>
  .home-nav-bar {
    color: white;
    background-color: var(--color-tint);
  }
</style>
