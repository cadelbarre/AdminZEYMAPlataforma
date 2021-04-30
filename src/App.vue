<template>
    <component :is="layout"></component>
</template>
<script>
import loginLayout from './layout/Login.vue'
import principalLayout from './layout/Dashboard.vue'
import errorLayout from './layout/TheError404.vue'

import { mapState } from 'vuex'
export default {
    components: {
        loginLayout,
        principalLayout,
        errorLayout
    },
    computed: {
        ...mapState(['layout'])
    }

}
</script>
<style lang="scss">
@import "./assets/main.scss";
</style>