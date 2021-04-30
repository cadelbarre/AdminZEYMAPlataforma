<template>
	<section></section>
</template>
<script>
export default {
    name: 'error404',
    mounted() {
        this.$store.commit('SET_LAYOUT', 'error-layout')
    },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>