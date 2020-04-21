<template>
  <tab-bar>
    <tab-bar-item link="/home" activeColor="var(--color-tint)">
      <svg slot="item-icon" class="icon" aria-hidden="true">
        <use xlink:href="#icon-shouye1-copy"></use>
      </svg>
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item link="/category" activeColor="var(--color-tint)">
      <svg slot="item-icon" class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenlei"></use>
      </svg>
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item link="/shopCart" activeColor="var(--color-tint)">
      <svg slot="item-icon" class="icon" aria-hidden="true">
        <use xlink:href="#icon-gouwucheman"></use>
      </svg>
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item link="/profile" activeColor="var(--color-tint)">
      <svg slot="item-icon" class="icon" aria-hidden="true">
        <use xlink:href="#icon-wode"></use>
      </svg>
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
  //路径比较深的话可以使用路径别名，看起来没有那么多../
  import TabBar from "components/common/tabbar/TabBar";
  import TabBarItem from "components/common/tabbar/TabBarItem";
  require("assets/iconfont/tabbar/iconfont");

  export default {
    name: "MainTabBar",
    components: {
      TabBar,
      TabBarItem
    }
  }
</script>

<style scoped>

</style>
