<template>
  <div class="recommend">
    <div v-for="item in recommends" :key="item.image" class="recommend-item">
      <a href="item.link">
        <img :src="item.image" alt="">
        <p>{{item.title}}</p>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HomeRecommendView",
    props: {
      recommends: {
        type: Array,
        default() {
          return [];
        }
      }
    }
  }
</script>

<style scoped>
  .recommend {
    display: flex;
    width: 100vw;
    text-align: center;
    justify-content: space-around;
    font-size: 12px;
    padding: 10px 0px 20px 0px;
    border-bottom: 8px solid rgba(189, 195, 199,0.3);
  }
  .recommend-item img{
    padding: 0px 5px 0px 5px;
    width: 100%;
  }
</style>
