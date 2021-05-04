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

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
