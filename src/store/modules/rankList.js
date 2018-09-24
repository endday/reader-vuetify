import api from '../../utils/api'

const state = {
  rankType: {
    male: [],
    female: [],
    picture: [],
    epub: []
  },
  rankList: []
}

const mutations = {
  setRankType (state, { male, female, picture, epub }) {
    state.rankType = {
      male,
      female,
      picture,
      epub
    }
    state.rankList = Array(male.length).fill([])
  },
  setRankList (state, { res, index }) {
    const list = res.ranking.books
    list.forEach(item => {
      item.cover = decodeURIComponent(item.cover).slice(7)
    })
    state.rankList.splice(index, 1, list)
  }
}

const actions = {
  getRankType ({ state, commit }) {
    if (state.rankType.male.length) {
      return Promise.resolve()
    }
    return api.getRankType()
      .then(res => {
        commit('setRankType', res)
        return Promise.resolve()
      })
  },
  getRankList ({ state, commit, dispatch }, index) {
    dispatch('getRankType')
      .then(() => {
        if (state.rankList[index].length) {
          return Promise.resolve()
        }
        const listId = state.rankType.male[index]._id
        return api.getRankList(listId)
      })
      .then(res => {
        if (res) {
          commit('setRankList', { res, index })
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
