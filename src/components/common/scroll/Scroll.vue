<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from "better-scroll"

  export default {
    name: "Scroll",
    data() {
      return {
        scroll: null
      }
    },
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      },
      pullDownRefresh: {
        type: Boolean,
        default: false
      },
      pullDownRefreshStop: {
        type: Number,
        default: 0
      }
    },
    mounted() {
      //1、创建better-scroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        pullUpLoad: {
          boolean: this.pullUpLoad,
          //设置上拉多大距离才能触发方法
          threshold: -100
        },
        pullDownRefresh: {
          boolean: this.pullDownRefresh,
          threshold: 40,
          //刷新数据的过程中，回弹停留在距离顶部还有40px的位置
          stop: this.pullDownRefreshStop
        },
        click: true
      })

      //2、监听滚动的位置
      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on("scroll", position => {
          this.$emit('scroll', position);
        })
      }

      //3、监听上拉事件
      if (this.pullUpLoad) {
        this.scroll.on("pullingUp", () => {
          this.$emit("pullingUp");
          setTimeout(() => {
            //必须调用此方法才可以进行下次上拉,1.5秒可以拉取一次
            this.scroll.finishPullUp();
          }, 1500);
        })
      }

      //4、监听下拉事件
      if (this.pullDownRefresh) {
        this.scroll.on("pullingDown", () => {
          this.$emit("pullingDown");
          setTimeout(() => {
            //必须调用此方法才可以进行下次上拉
            this.scroll.finishPullDown();
          }, 1500);
        })
      }
    },

    methods: {
      //1、监听滚动到什么地方
      scrollTo(x, y, time = 500) {
        this.scroll && this.scroll.scrollTo(x, y, time);
      },

      //2、重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常。
      refresh() {
        this.scroll && this.scroll.refresh();
      },

      //3、获取当前的Y值
      getScrollY() {
        return this.scroll ? this.scroll.y : 0;
      }
    }
  }
</script>

<style scoped>

</style>
