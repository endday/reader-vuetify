import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from '../plugins/logger'
import rank from './modules/rankList'
import shelf from './modules/shelf'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    rank,
    shelf
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
