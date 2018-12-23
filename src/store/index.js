import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from '../plugins/logger'
import rank from './modules/rankList'
import shelf from './modules/shelf'
import reader from './modules/reader'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    rank,
    shelf,
    reader
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
  state: {
    showToolbar: true
  },
  mutations: {
    toggleToolbar (state, val) {
      if (val !== undefined) {
        state.showToolbar = val
      } else {
        state.showToolbar = !state.showToolbar
      }
    }
  }
})
