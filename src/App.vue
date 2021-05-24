<template>
    <section>
        <b-loading is-full-page v-model="isLoading"></b-loading>
        <component :is="layout"></component>
    </section>
</template>
<script>
import VueStore from "@/store/index";
import VueRouter from "@/router/index";
import Firebase from "firebase/app";
import 'firebase/auth'
import loginLayout from "./layout/Login.vue";
import principalLayout from "./layout/Dashboard.vue";
import errorLayout from "./layout/TheError404.vue";

import { mapState } from "vuex";
export default {
    components: {
        loginLayout,
        principalLayout,
        errorLayout,
    },
    data() {
        return {
            isLoading: false,
        };
    },
    asyncComputed: {
        ...mapState(["layout"]),
        async currentUser() {
            this.isLoading = true;
            const user = await Firebase.getCurrentUser();
            if (user) {
                await VueStore.dispatch("user/addReqAuth");
                await VueStore.dispatch("clients/fetchClientsList");
                if (VueRouter.history.current.path == "/") {
                    VueRouter.push("/dashboard");
                } else {
                    VueRouter.go(-1);
                }

                this.isLoading = false;
            } else {
                this.isLoading = false;
            }
        },
    },

};
</script>
<style lang="scss" src="./assets/main.scss">
</style>