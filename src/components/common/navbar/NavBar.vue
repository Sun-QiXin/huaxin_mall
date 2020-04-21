<template>
  <div class="nav-bar">
    <div class="nav-bar-left">
      <slot name="nav-bar-left"></slot>
    </div>

    <div class="nav-bar-center">
      <slot name="nav-bar-center"></slot>
    </div>

    <div class="nav-bar-right">
      <slot name="nav-bar-right"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NavBar"
  }
</script>

<style scoped>
  .nav-bar{
    display: flex;
    text-align: center;
    height: 44px;
    line-height: 44px;
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.3);
  }
  .nav-bar-left{
    flex: 1;
  }
  .nav-bar-center{
    flex: 4;
  }
  .nav-bar-right{
    flex: 1;
  }
</style>
