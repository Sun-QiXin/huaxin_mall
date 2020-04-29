<template>
  <div id="shopping-cart">
    <!--导航-->
    <nav-bar class="nav-bar">
      <div slot="nav-bar-center">购物车({{shoppingCartLength}})</div>
      <div slot="nav-bar-right" @click="deleteProduct">管理</div>
    </nav-bar>

    <!--商品的列表-->
    <shopping-cart-list/>

    <!--底部汇总-->
    <shopping-cart-bottom-bar :message="message" :is-show-message="isShowMessage"
                              @cancelClick="cancelClick"/>
  </div>
</template>

<script>
  import ShoppingCartList from "./childComponents/ShoppingCartList";
  import ShoppingCartBottomBar from "./childComponents/ShoppingCartBottomBar";


  import NavBar from "components/common/navbar/NavBar";

  //mapGetters辅助函数仅仅是将store中的getters映射到局部计算属性
  import {mapGetters} from 'vuex';

  export default {
    name: "ShoppingCart",
    data() {
      return {
        message: '结算',
        isShowMessage: false
      }
    },
    components: {
      NavBar,
      ShoppingCartList,
      ShoppingCartBottomBar
    },
    computed: {
      //mapGetters辅助函数仅仅是将store中的getters映射到局部计算属性
      ...mapGetters(["shoppingCartLength", "shoppingCartList"]),
      //也可以给getters指定别名
      /*...mapGetters({
        length: "shoppingCartLength",
        list: "shoppingCartList"
      })*/
    },
    methods: {
      //1、监听管理按钮的点击
      deleteProduct() {
        this.message = '删除';
        this.isShowMessage = true;
      },
      //2、子组件取消按钮的点击
      cancelClick(){
        this.isShowMessage = false;
        this.message = '结算';
      }
    }
  }
</script>

<style scoped>
  #shopping-cart {
    position: relative;

  }

  .nav-bar {
    background-color: var(--color-tint);
    color: white;
  }
</style>
