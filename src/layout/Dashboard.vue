<template>
    <div id="app">
        <section class="hero has-background-light is-fullheight">
            <Header />
            <div class="hero-body">
                <div class="container">
                    <transition name="router-animated" mode="out-in" leave-active-class="animated fadeOut" enter-active-class="animated fadeIn">
                        <router-view />
                    </transition>
                </div>
            </div>
            <Footer />
        </section>
    </div>
</template>
<script>
import Header from './TheHeader.vue'
import Footer from './TheFooter.vue'
export default {
    components: {
        Header,
        Footer
    }
}
</script>
<style scoped lang="scss">
.hero-body {
    align-items: flex-start !important;
}
</style>