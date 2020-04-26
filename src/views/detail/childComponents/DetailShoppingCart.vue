<template>
  <div id="detail-shopping-cart" v-if="isShowShoppingCart">
    <div class="container">
      <div class="showMsg">
        <img :src="showImg" alt="">
        <div class="currentMsg">
          <p class="price"><span>￥</span>{{productPrice}}</p>
          <p class="stock">库存{{stock}}件</p>
          <p class="choice">已选择：<span>{{productStyleMsg}}{{productSizeMsg}}</span></p>
          <button class="closeBtn" @click="closeClick">❌</button>
        </div>
      </div>

      <scroll class="content">
        <div class="productMsg">
          <p>{{shoppingCartInfo.props[0].label}}</p>
          <button v-for="(item,index) in shoppingCartInfo.props[0].list" :key="index"
                  @click="ShowInfo(item,index)" :class="{active:currentIndex1===index}">
            {{item.name}}
          </button>
        </div>

        <div class="productMsg">
          <p>{{shoppingCartInfo.props[1].label}}</p>
          <button v-for="(item,index) in shoppingCartInfo.props[1].list" :key="index"
                  @click="ShowInfo(item,index)" :class="{active:currentIndex2===index}">
            {{item.name}}
          </button>
        </div>

        <div class="showCount">
          <p>数量:</p>
          <div class="btns">
            <button @click="decrease">-</button>
            <button>{{currentCounts}}</button>
            <button @click="increase">+</button>
          </div>
          <span style="color: var(--color-high-text);font-size: 13px">{{tipsMsg}}</span>
        </div>
      </scroll>

      <button class="commit" @click="addShoppingCart">确定</button>
    </div>
  </div>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";

  export default {
    name: "DetailCartInfo",
    components: {
      Scroll
    },
    data() {
      return {
        styleId: 1,
        sizeId: 100,
        nowPrice: 0,
        stock: 0,
        productStyleMsg: '',
        productSizeMsg: '',
        currentIndex1: 0,
        currentIndex2: 0,
        currentCounts: 1,
        tipsMsg: "",
        isShowShoppingCart: false
      }
    },
    props: {
      shoppingCartInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      //1、显示图片
      showImg() {
        if (this.shoppingCartInfo.skus != undefined) {
          for (const product of this.shoppingCartInfo.skus) {
            if (product.styleId == this.styleId) {
              this.nowPrice = product.nowprice;
              this.stock = product.stock;
              this.productStyleMsg = "\"" + product.style + "\"";
              this.productSizeMsg = "\"" + product.size + "\"";
              return product.img;
            }
          }
        }
      },

      //2、转换购物车里面错误价格
      productPrice() {
        const str = this.nowPrice.toString();
        const startStr = str.substr(0, (str.length - 2));
        const endTwoStr = str.substr((str.length - 2), 2);
        this.nowPrice = startStr + '.' + endTwoStr;
        return startStr + '.' + endTwoStr;
      }
    },
    methods: {
      //1、保存选中的信息
      ShowInfo(productMsg, index) {
        if (productMsg.styleId != undefined) {
          this.productStyleMsg = "\"" + productMsg.name + "\"";
          //保存当前选中的下标
          this.currentIndex1 = index;
          this.styleId = productMsg.styleId;
        }
        if (productMsg.sizeId != undefined) {
          this.sizeId = productMsg.sizeId;
          //保存当前选中的下标
          this.currentIndex2 = index;
          this.productSizeMsg = "\"" + productMsg.name + "\"";
        }
      },

      //2、增加数量
      increase() {
        if (this.currentCounts >= 1) {
          this.currentCounts++;
        }
      },

      //3、减少数量
      decrease() {
        if (this.currentCounts > 1) {
          this.currentCounts--;
        } else {
          this.tipsMsg = "最少购买一件";
          setTimeout(() => {
            this.tipsMsg = "";
          }, 1000)
        }
      },

      //4、关闭购物车
      closeClick() {
        this.isShowShoppingCart = false;
      },

      //5、将商品添加到购物车
      addShoppingCart() {
        this.$emit('addShoppingCart');
      }
    }
  }
</script>

<style scoped>
  #detail-shopping-cart {
    position: fixed;
    top: 44px;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }

  #detail-shopping-cart .container {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 60vh;
    background-color: #fff;
    padding: 7px;
    animation: showShoppingCart 0.6s ease-out;
  }

  @keyframes showShoppingCart {
    0% {
      height: 0;
    }
    100% {
      height: 60vh;
    }
  }

  .content {
    height: calc(60vh - 151px - 44px);
    overflow: hidden;
  }

  .container .showMsg {
    display: flex;
    height: 151px;
  }

  .container .currentMsg {
    position: relative;
    flex: 3;
    margin-left: 20px;
  }

  .container .currentMsg .price {
    width: 100%;
    font-size: 30px;
    font-weight: 400;
    color: black;
  }

  .closeBtn {
    outline: none;

  }

  .container .currentMsg .price span {
    vertical-align: top;
    font-size: 14px;
  }

  .container .currentMsg .stock {
    padding-top: 5px;
    font-size: 13px;
  }

  .container .currentMsg .choice {
    padding-top: 10px;
    font-size: 13px;
  }

  .container .currentMsg .choice span {
    color: var(--color-tint);
  }

  .closeBtn {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    background-color: #fff;
    height: 25px;
  }

  .container .showMsg img {
    flex: 1;
    position: relative;
    top: -50px;
    left: 10px;
    width: 25%;
  }

  .productMsg p {
    font-size: 14px;
    color: #666;
  }

  .productMsg button {
    text-decoration: none;
    font-size: 12px;
    color: #666666;
    outline: none;
    margin: 10px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    padding: 4px 15px 4px 15px;
    background-color: #fff;
  }

  .productMsg .active {
    color: var(--color-high-text);
    border: 1px solid var(--color-high-text);
  }

  .showCount .btns {
    display: inline-block;
    margin: 10px;
    width: 107px;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.5);
  }

  .showCount p {
    font-size: 14px;
  }

  .showCount .btns button {
    height: 25px;
    outline: none;
    background-color: #fff;
    border: none;
    border-right: 1px solid rgba(0, 0, 0, 0.5);
    border-collapse: collapse;
    width: 35px;
  }

  .showCount .btns button:last-child {
    border: none;
  }

  .commit {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    outline: none;
    border: none;
    background-image: linear-gradient(45deg, var(--color-high-text), var(--color-tint));
    color: white;
    width: 100%;
    height: 44px;
    line-height: 44px;
  }
</style>
