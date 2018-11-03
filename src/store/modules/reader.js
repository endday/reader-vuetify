import api from '../../utils/api.js'

const state = {
  bookSource: [],
  sourceId: null,
  catalog: [],
  chapterNo: 0,
  pageNo: 0
}

const getters = {
  chapter ({ state }) {
    return state.catelog[state.chapterNo].article
  },
  currentBookSource ({ state }) {
    return state.bookSource.find(item => item._id === state.sourceId)
  }
}

const mutations = {
  setBookSource ({ state }, data) {
    state.bookSource = data
  }
}

const actions = {
  bookSource ({ state, commit }, id) {
    return api.getBookSource(id)
      .then(res => {
        commit('setBookSource', res)
      })
  },
  catelog ({ state }, id) {
    return api.getCatalog(id)
  },
  chapter ({ state }, link) {
    return api.getChapter(link)
  },
  init ({ dispatch, state }, id) {
    dispatch('bookSource', id)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
