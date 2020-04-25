<template>
  <div>
    <nav-bar class="detail-nav-bar">
      <div slot="nav-bar-left" class="detailImg" @click="detailBackClick">
        <img src="~assets/img/common/back.svg" alt="返回">
      </div>

      <div slot="nav-bar-center" class="title">
        <div v-for="(item,index) in titles" :key="index"
             :class="{active:currentIndex===index}" @click="detailTitleClick(index)">{{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";

  export default {
    name: "DetailNavBar",
    components: {
      NavBar
    },
    props: {
      titleCurrentIndex: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        titles: [`商品`, `参数`, `评论`, `推荐`],
        currentIndex: 0
      }
    },
    methods: {
      //1、点击切换标签
      detailTitleClick(index) {
        this.currentIndex = index;
        this.$emit('detailTitleClick', index);
      },

      //2、点击返回
      detailBackClick() {
        this.$router.back();
      }
    },
    watch: {
      //根据详情页面传过来的索引值改变下标
      titleCurrentIndex(value) {
        this.currentIndex = value;
      }
    }
  }
</script>

<style scoped>
  .detail-nav-bar .title {
    display: flex;
    justify-content: space-around;
    font-size: 13px;
    cursor: pointer;
  }

  .active {
    color: var(--color-tint);
  }

  .detailImg {
    display: flex;
    justify-content: center;
    height: 100%;
    align-items: center;
  }
</style>
