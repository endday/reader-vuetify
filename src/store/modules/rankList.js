import api from '../../utils/api'

const state = {
  rankType: []
}

const mutations = {
  setRankType (state, { male, female, picture, epub }) {
    male.forEach(item => {
      item.books = []
    })
    female.forEach(item => {
      item.books = []
    })
    picture.forEach(item => {
      item.books = []
    })
    epub.forEach(item => {
      item.books = []
    })
    state.rankType.push(male, female, epub, picture)
  },
  setBooks (state, { res, index, subIndex }) {
    const list = res.ranking.books
    list.forEach(item => {
      item.cover = decodeURIComponent(item.cover).slice(7)
    })
    state.rankType[index][subIndex].books = list
  }
}

const actions = {
  getRankType ({ state, commit }) {
    if (state.rankType.length) {
      return Promise.resolve()
    }
    return api.getRankType()
      .then(res => {
        commit('setRankType', res)
        return Promise.resolve()
      })
  },
  getBooks ({ state, commit, dispatch }, { index, subIndex }) {
    dispatch('getRankType')
      .then(() => {
        const books = state.rankType[index][subIndex].books
        if (books && books.length) {
          return Promise.resolve()
        } else {
          const listId = state.rankType[index][subIndex]._id
          return api.getRankList(listId)
        }
      })
      .then(res => {
        if (res) {
          commit('setBooks', { res, index, subIndex })
        }
      })
  }
}

export default {
  namespaced: true,
  state,
  // getters,
  actions,
  mutations
}
