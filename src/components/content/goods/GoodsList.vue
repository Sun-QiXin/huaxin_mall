<template>
  <div id="goods-list">
    <goods-list-item v-for="item in goods" :key="item.show.img" :goods-item="item"/>
  </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem";

  export default {
    name: "GoodsList",
    components: {
      GoodsListItem
    },
    props: {
      goods: {
        type: Array,
        default() {
          return [];
        }
      }
    }
  }
</script>

<style scoped>
  #goods-list {
    width: 100%;
    flex-wrap: wrap;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
