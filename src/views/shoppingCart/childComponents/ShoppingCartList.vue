<template>
  <div id="shopping-cart-list">
    <scroll class="content" ref="scroll">
      <shopping-cart-list-item
        v-for="(item,index) in shoppingCartList"
        :key="index"
        :product="item"/>
    </scroll>
  </div>
</template>

<script>
  import ShoppingCartListItem from "./ShoppingCartListItem";

  import Scroll from "components/common/scroll/Scroll";
  //mapGetters辅助函数仅仅是将store中的getters映射到局部计算属性
  import {mapGetters} from 'vuex'

  export default {
    name: "ShoppingCartList",
    components: {
      Scroll,
      ShoppingCartListItem
    },
    computed: {
      ...mapGetters(["shoppingCartList"])
    },
    activated() {
      //每次进入购物车页面就重新计算一下高度
      this.$refs.scroll.refresh();
    }
  }
</script>

<style scoped>
  #shopping-cart-list {
    position: relative;
  }

  .content {
    height: calc(100vh - 44px - 49px - 40px);
    overflow-y: hidden;
  }
</style>
