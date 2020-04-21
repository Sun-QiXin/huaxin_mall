<template>
    <div class="slide">
      <slot></slot>
    </div>
</template>

<script>
	export default {
		name: "Slide"
	}
</script>

<style scoped>
  .slide {
    width: 100%;
    /*子元素宽度大于父元素也不收缩*/
    flex-shrink: 0;
  }

  .slide img {
    width: 100%;
  }
</style>
