<template>
    <div id="app">
        <section class="hero has-background-light is-fullheight">
            <div class="hero-body">
                <div class="container">
                    <div class="columns is-centered">
                        <div class="column is-6-tablet is-7-desktop is-5-widescreen">
                            <transition name="router-animated" mode="out-in" leave-active-class="animated fadeOut" enter-active-class="animated fadeIn">
                                <router-view />
                            </transition>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </section>
    </div>
</template>
<script>
import Footer from '@/layout/TheFooter.vue'
export default {
    components: {
        Footer
    }
}
</script>
<style scoped lang="scss">
</style>