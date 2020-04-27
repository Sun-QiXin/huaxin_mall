<template>
  <div id="shopping-cart-bottom-bar">
    <div class="check-all" @click="checkAllClick">
      <check-button class="check-btn" :is-checked="isCheckAll"/>
      <span>全选</span>
    </div>
    <div class="total-price">合计：<span>￥{{totalPrice}}</span></div>
    <div class="calculation" @click="calculationClick">去计算({{totalCount}})</div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";

  import {mapGetters} from 'vuex'

  export default {
    name: "ShoppingCartBottomBar",
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(["shoppingCartList"]),
      //1、汇总价格
      totalPrice() {
        return this.shoppingCartList.filter(item => {
          return item.checked;
        }).reduce((preValue, item) => {
          return item.realPrice * item.currentCounts + preValue;
        }, 0).toFixed(2)
      },

      //2、汇总选中的个数
      totalCount() {
        return this.shoppingCartList.filter(item => item.checked).length
      },

      //3、全选与单选的联动实现
      isCheckAll() {
        //every():一假即假 ，而且只要有一个元素是假，其后面的元素将不再遍历。
        //some()：一真即真
        if (this.shoppingCartList.length === 0) return false;
        return this.shoppingCartList.every(item => item.checked);
      }
    },
    methods: {
      //1、全选按钮的实现
      checkAllClick() {
        //计算属性isCheckAll为true表示当前为全部选中状态，点击全选那就全部不选中
        if (this.isCheckAll) {
          this.shoppingCartList.map(item => {
            //修改store里面的数据一定要经过mutations，否则调试插件监控不到
            this.$store.commit("updateChecked", {item, checked: false})
          })
        } else {
          this.shoppingCartList.map(item => {
            this.$store.commit("updateChecked", {item, checked: true})
          })
        }
      },

      //2、点击计算按钮
      calculationClick() {
        //some()：一真即真
        if (!this.shoppingCartList.some(item => item.checked)) {
          this.$toast.showToast("请至少选择一项商品!", 800);
        }
      }
    }
  }
</script>

<style scoped>
  #shopping-cart-bottom-bar {
    display: flex;
    position: relative;
    height: 40px;
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.3);
  }

  #shopping-cart-bottom-bar .check-all {
    flex: 1;
    width: auto;
    display: flex;
    line-height: 40px;
    justify-content: center;
  }

  #shopping-cart-bottom-bar .check-all .check-btn {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #shopping-cart-bottom-bar .total-price {
    text-align: center;
    flex: 2;
    height: 40px;
    line-height: 40px;
  }

  #shopping-cart-bottom-bar .total-price span {
    color: var(--color-tint);
  }

  #shopping-cart-bottom-bar .calculation {
    color: white;
    background-color: var(--color-high-text);
    text-align: center;
    flex: 1;
    height: 40px;
    line-height: 40px;
  }
</style>
