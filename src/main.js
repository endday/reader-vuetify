// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './assets/common.css'

import '../node_modules/vuetify/src/stylus/app.styl'
import axios from './utils/axios'
import vuetify from './utils/vuetify.conf'
import page from './components/page'

Vue.use(vuetify)
Vue.use(axios)

Vue.component('page', page)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
