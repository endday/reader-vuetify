const state = {
  books: []
}

const mutations = {
  getBooks () {
    let session = window.localStorage.getItem('bookShelf')
    state.books = session ? JSON.parse(session) : []
  }
}

export default {
  namespaced: true,
  state,
  // getters,
  // actions,
  mutations
}
