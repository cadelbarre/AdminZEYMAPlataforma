<template>
    <div id="app">
        <section class="hero has-text-light is-fullheight">
            <div class="hero-body">
                <div class="container px-6">
                    <div class="columns is-vcentered">
                        <div class="column is-6">
                            <b-image :src="require('@/static/error404.webp')" ratio="1by1">
                                <template>
                                    <b-skeleton class="skeleton-placeholder" height="100%"></b-skeleton>
                                </template>
                            </b-image>
                        </div>
                        <div class="column is-6 has-text-centered px-5">
                            <h1 class="title is-size-1 has-text-centered">Oops!, la pagina no fue encontrada.</h1>
                            <p class="has-text-centered mb-5">
                                La página a la que intentas acceder no existe o se ha movido. Intenta regresar a la página principal.
                            </p>
                            <b-button label="Ir a la pagina principal" type="is-info" @click="$router.push('/dashboard')"></b-button>
                            <p class="mt-3">Si piensas que es un error, contacta con nuestro equipo de soporte en soporte@zeyma.co</p>
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
<style lang="scss">
</style>