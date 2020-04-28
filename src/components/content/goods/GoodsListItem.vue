<template>
  <div id="goods-list-item" @click="goodsItemBuyClick" :class="{'max-180':isMaxWidth}">
    <img v-lazy="showImage" alt="" class="img" @load="imageLoad">
    <p>{{goodsItem.title}}</p>
    <div class="msg">
        <span class="price">
        <span>限时价</span>
        {{showPrice}}
        </span>
      <span class="collect">{{showOldPrice}}</span>
    </div>
    <button>立即购买</button>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    data() {
      return {
        isMaxWidth: false
      }
    },
    props: {
      goodsItem: {
        type: Object,
        default() {
          return null;
        }
      }
    },
    computed: {
      //根据服务器传过来的数据寻找图片显示
      showImage() {
        return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
      },

      //根据当前路由显示不同的价格
      showPrice() {
        if (this.$route.path.indexOf("/home") !== -1) {
          return this.goodsItem.price;
        } else if (this.$route.path.indexOf("/detail") !== -1) {
          return this.goodsItem.discountPrice;
        } else if (this.$route.path.indexOf("/category") !== -1) {
          return this.goodsItem.price;
        }
      },

      //根据当前路由显示不同的原价格
      showOldPrice() {
        if (this.$route.path.indexOf("/home") !== -1) {
          return this.goodsItem.orgPrice;
        } else if (this.$route.path.indexOf("/detail") !== -1) {
          return '￥' + this.goodsItem.price;
        } else if (this.$route.path.indexOf("/category") !== -1) {
          return '￥' + this.goodsItem.orgPrice;
        }
      },
    },
    methods: {
      //监听图片加载
      imageLoad() {
        this.$bus.$emit('itemImageLoad');
      },
      //监听按钮点击
      goodsItemBuyClick() {
        this.$router.push("/detail/" + this.goodsItem.iid);
      }
    },
    mounted() {
      //如果父容器的宽度低于180px，就调整宽度高度
      this.$nextTick(()=>{
        const currentWidth = document.getElementById('goods-list-item').offsetWidth;
        if (currentWidth < 180) {
          if (!this.isMaxWidth){
            this.isMaxWidth = true;
          }
        }else {
          if (this.isMaxWidth){
            this.isMaxWidth = false;
          }
        }
      })
    }
  }
</script>

<style scoped>
  #goods-list-item {
    text-align: center;
    margin-top: 10px;
    flex: 0 0 50%;
    height: auto;
    width: 100%;
  }

  #goods-list-item .img {
    border-radius: 7px;
    border: 2px solid #fff;
    width: 100%;
    height: 44vh;
    background-size: cover;
  }

  @media (width: 375px) and (height: 667px) {
    #goods-list-item .img {
      border-radius: 7px;
      border: 2px solid #fff;
      width: 100%;
      height: 44vh;
      background-size: cover;
    }
  }

  @media (width: 375px) and (height: 812px) {
    #goods-list-item .img {
      border-radius: 7px;
      border: 2px solid #fff;
      width: 100%;
      height: 36vh;
      background-size: cover;
    }
  }

  @media (min-width: 420px) and (max-width: 768px) {
    #goods-list-item {
      text-align: center;
      margin-top: 10px;
      flex: 0 0 33%;
      height: auto;
      width: 100%;
    }

    #goods-list-item .img {
      border-radius: 7px;
      border: 2px solid #fff;
      width: 100%;
      height: 40vh;
      background-size: cover;
    }
  }

  @media (min-width: 1024px) and (max-width: 1366px) {
    #goods-list-item {
      text-align: center;
      margin-top: 10px;
      flex: 0 0 25%;
      height: auto;
      width: 100%;
    }

    #goods-list-item .img {
      border-radius: 7px;
      border: 2px solid #fff;
      width: 100%;
      height: 30vh;
      background-size: cover;
    }
  }

  @media (min-width: 1367px) {
    #goods-list-item {
      text-align: center;
      margin-top: 10px;
      flex: 0 0 20%;
      height: auto;
      width: 100%;
    }

    #goods-list-item .img {
      border-radius: 7px;
      border: 2px solid #fff;
      width: 100%;
      height: 65vh;
      background-size: cover;
    }
  }

  #goods-list-item p {
    margin-bottom: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    /*只显示一行*/
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

  #goods-list-item .msg {
    display: flex;
    padding: 0px 10px 0px 10px;
    display: flex;
    justify-content: space-between;
  }

  #goods-list-item .price {
    flex: 2;
    max-width: 100%;
    font-size: 18px;
    font-weight: bold;
  }

  #goods-list-item .price span {
    vertical-align: middle;
    font-size: 12px;
    vertical-align: top;
    border: 1px solid var(--color-tint);
    font-weight: 600;
    color: var(--color-tint);
  }

  #goods-list-item .collect {
    flex: 1;
    font-style: oblique;
    font-size: 12px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.3);
    text-decoration: line-through;
  }

  #goods-list-item button {
    color: white;
    margin-top: 10px;
    height: 30px;
    line-height: 30px;
    border-radius: 4px;
    border: 1px solid transparent;
    outline: none;
    width: 90%;
    background-color: var(--color-high-text);
  }

  /*如果goods-list-item容器的宽度小于180px*/
  .max-180 img{
    height: 30vh!important;
  }

  .max-180 .price{
    font-size: 14px!important;
  }

  .max-180 .price span{
    font-size: 10px!important;
  }

  .max-180 .collect{
    font-size: 10px!important;
  }

  .max-180 .msg{
    padding: 0px 3px 0px 3px!important;
  }
</style>
