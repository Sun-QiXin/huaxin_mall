<template>
  <div id="tab-control">
    <div v-for="(item,index) in titles" :key="index"
         class="tab-control-item"
         :class="{active: currentIndex === index}" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    data() {
      return {
        currentIndex: 0
      }
    },
    props: {
      titles: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index;
        //将点击的元素下标传回父组件
        this.$emit('tabClick', index);
      }
    }
  }
</script>

<style scoped>
  #tab-control {
    display: flex;
    justify-content: space-around;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 15px;
    background-color: #fff;
  }

  #tab-control .tab-control-item span {
    padding: 6px;
  }

  .active {
    color: var(--color-tint);
  }

  .active span {
    border-bottom: 2px solid var(--color-tint);
  }
</style>
