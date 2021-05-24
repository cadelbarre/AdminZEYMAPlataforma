import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
Vue.use(Buefy)

import AsyncComputed from 'vue-async-computed'
Vue.use(AsyncComputed);

import Firebase from '@/classes/Config'
Vue.use(Firebase)

import IdleVue from 'idle-vue'
const eventsHub = new Vue();
Vue.use(IdleVue,
{
  eventEmitter: eventsHub,
  store,
  idleTime: 5000, // 3 seconds
  startAtIdle: false
})

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')