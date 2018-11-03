import axios from 'axios'

export default {
  getRankType () {
    return axios.get('rank/list')
  },
  getRankList (id) {
    return axios.get(`rank/${id}`)
  },
  getBookSource (id) {
    return axios.get(`book/sources/${id}`)
  },
  getCatalog (id) {
    return axios.get(`book/catalog/${id}`)
  },
  getChapter (link) {
    const formatLink = encodeURIComponent(link)
    return axios.get(`book/chapter/${formatLink}`)
  }
}
