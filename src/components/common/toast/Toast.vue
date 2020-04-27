<template>
  <div id="toast" v-show="isShowMessage">
    <div class="msg">{{showMessage}}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    data() {
      return {
        showMessage: '',
        isShowMessage: false
      }
    },
    methods: {
      //直接调用此方法即可显示提示信息
      showToast(message = '请传入信息！', duration = 500) {
        this.isShowMessage = true;
        this.showMessage = message;
        setTimeout(() => {
          this.isShowMessage = false;
          this.showMessage = ''
        }, duration)
      }
    }
  }
</script>

<style scoped>
  #toast {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 49px;
    right: 0;
    left: 0;
    height: calc(100% - 44px - 49px);
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 9999;
  }

  #toast .msg {
    color: white;
    display: block;
    width: 50%;
    height: 26px;
    line-height: 26px;
    text-align: center;
    border-radius: 7px;
    background-image: linear-gradient(90deg, rgba(7, 153, 146, .8), rgba(96, 163, 188, .7));
  }
</style>
