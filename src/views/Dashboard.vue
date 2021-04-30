<template>
    <transition name="router-animated" mode="out-in" leave-active-class="animated fadeOut" enter-active-class="animated fadeIn">
        <router-view />
    </transition>
</template>
<script>
export default {
    name: 'dashboard',
    mounted() {
        this.$store.commit('SET_LAYOUT', 'principal-layout')
    },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>