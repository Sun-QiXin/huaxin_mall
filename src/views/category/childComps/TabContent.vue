<template>

</template>

<script>

	export default {
		name: "TabContent",
    components: {
    },
    props: {
      subcategories: {
        type: Object,
        default() {
          return {}
        }
      },
      categoryDetail: {
        type: Array,
        default() {
          return []
        }
      }
    }
	}
</script>

<style scoped>
</style>
