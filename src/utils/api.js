import axios from 'axios'

export default {
  getRankType () {
    return axios.get('rank/list')
  },
  getRankList (id) {
    return axios.get(`rank/${id}`)
  }
}
