// import api from '../../utils/api.js'

const defaultBg = '#c4b395'
const nightBg = '#000'

const state = {
  mode: 'day',
  style: {
    background: '#c4b395',
    fontSize: '16px',
    color: '#000'
  }
}

const getters = {
  style (state) {
    const style = {
      background: state.style.background,
      fontSize: state.style.fontSize,
      color: state.style.color
    }
    if (state.mode === 'night') {
      style.background = nightBg
      style.color = '#eee'
    } else {
      style.background = defaultBg
      style.color = '#000'
    }
    return style
  }
}

const mutations = {
  toggleMode (state, isDay) {
    if (isDay !== undefined) {
      state.mode = isDay ? 'day' : 'night'
    } else {
      state.mode = state.mode === 'day' ? 'night' : 'day'
    }
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
