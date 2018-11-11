import axios from 'axios'
import Vue from 'vue'

axios.defaults.baseURL = 'http://39.108.85.231:4000/api/'
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

axios.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  return response.data
}, function (error) {
  return Promise.reject(error)
})

Vue.prototype.$http = axios
