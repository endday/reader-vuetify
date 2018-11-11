// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import './plugins/vuetify'
import './plugins/axios'
import App from './App'
import router from './router'
import store from './store'
import './assets/common.css'
import page from './components/page'

Vue.component('page', page)

Vue.config.productionTip = false

if ('serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    // navigator.serviceWorker.register('/serviceWorker.js')
  })
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
