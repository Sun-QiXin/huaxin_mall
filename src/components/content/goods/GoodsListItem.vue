<template>
  <div id="goods-list-item">
    <img :src="goodsItem.show.img" alt="" class="img" @load="imageLoad">
    <p>{{goodsItem.title}}</p>
    <div class="msg">
        <span class="price">
        <span>限时价</span>
        {{goodsItem.price}}
        </span>
      <span class="collect">{{goodsItem.orgPrice}}</span>
    </div>
    <button @click="goodsItemBuyClick">立即购买</button>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goodsItem: {
        type: Object,
        default() {
          return null;
        }
      }
    },
    methods: {
      //监听图片加载
      imageLoad() {
        this.$bus.$emit('itemImageLoad');
      },
      //监听按钮点击
      goodsItemBuyClick(){
        this.$router.push("/detail/"+this.goodsItem.iid);
      }
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
    height: 39vh;
    background-size: cover;
  }

  @media (width: 375px) {
    #goods-list-item .img {
      border-radius: 7px;
      border: 2px solid #fff;
      width: 100%;
      height: 34vh;
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
      height: 34vh;
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
      height: 25vh;
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
      height: 50vh;
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
    padding: 0px 10px 0px 10px;
    display: flex;
    justify-content: space-between;
  }

  #goods-list-item .price {
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
</style>
