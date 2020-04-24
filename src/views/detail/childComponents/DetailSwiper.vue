<template>
  <div>
    <swiper v-show="isZoom" class="detail-swiper">
      <swiper-item v-for="(item,index) in topImages" :key="index">
        <img :src="item" alt="" @click="imgClick(item)">
      </swiper-item>
    </swiper>

    <div v-if="!isZoom" class="detail-show-img" @click="imgClick">
      <img :src="showImg" alt="">
    </div>
  </div>
</template>

<script>
  import Swiper from "components/common/swiper/Swiper";
  import SwiperItem from "components/common/swiper/SwiperItem";

  export default {
    name: "DetailSwiper",
    data() {
      return {
        isZoom: true,
        showImg: null
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      topImages: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    methods: {
      imgClick(item) {
        this.isZoom = !this.isZoom
        this.showImg = item;
      }
    }
  }
</script>

<style scoped>
  .detail-swiper {
    height: 40vh;
    overflow: hidden;
  }

  .detail-show-img img {
    animation: imgZoom ease-out 1.5s;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }

  @keyframes imgZoom {
    0% {
      max-width: 0%;
      max-height: 0%;
    }
    100% {
      max-width: 100%;
      max-height: 100%;
    }
  }
</style>
