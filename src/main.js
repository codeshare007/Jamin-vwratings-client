import Vue from 'vue'
import App from './App.vue'

import router from './modules/router'
import store from './store'
import Api from './modules/api'
import VueGtag from "vue-gtag"
import Ads from 'vue-google-adsense';

Vue.config.productionTip = false
Vue.use(Api, store, router)
Vue.use(require('vue-script2'))
Vue.use(Ads.Adsense)

if (process.env.VUE_APP_GTAG_KEY) {
  Vue.use(VueGtag, {
    config: { id: process.env.VUE_APP_GTAG_KEY }
  }, router);
}

import '@/plugins/bootstrap-vue'
import '@/plugins/vuelidate'
import '@/plugins/v-viewer'
import '@/plugins/vue-star-rating'
import '@/plugins/vue-the-mask'
import '@/plugins/vue-loading'
import '@/plugins/vue-countdown';
import '@/plugins/vue-lazyload'
import '@/plugins/vue-linkify';
import '@/plugins/vue-fontawesome';
// import '@/plugins/vue-adsense'
import '@/assets/scss/main.scss'

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
