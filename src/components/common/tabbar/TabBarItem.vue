<template>
  <div class="tab-bar-item" @click="itemClick">

    <!--传过来的元素会直接替换插槽，不能使用动态样式，包一层div来实现-->
    <div :style="activeStyle">
      <!--具名插槽-->
      <slot name="item-icon"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      link: {
        type: String,
        default: '/home'
      },
      activeColor: {
        type: String,
        default: `red`
      }
    },
    computed: {
      //判断当前是点击的哪个按钮
      isActive() {
        //indexOf:如果=-1说明没有找到，$route：当前处于活跃的路由
        return this.$route.path.indexOf(this.link) !== -1;
      },
      //使用调用者传入的颜色
      activeStyle() {
        return this.isActive ? {color: this.activeColor} : {};
      }
    },
    methods: {
      itemClick() {
        this.$router.push(this.link).catch(err => err);
      }
    }
  }
</script>

<style scoped>
  .icon {
    width: 1.4em;
    height: 1.4em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }

  .tab-bar-item {
    box-sizing: border-box;
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
    padding-top: 3px;
  }
</style>
