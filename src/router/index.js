import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import rankList from '@/pages/rankList'
import bookDetail from '@/pages/bookDetail'
import reader from '@/pages/reader'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: index,
      name: 'index',
      meta: {
        name: '追书神器'
      }
    },
    {
      path: '/shelf',
      component: index,
      name: 'shelf',
      meta: {
        name: '追书神器'
      }
    },
    {
      path: '/discover',
      component: index,
      name: 'discover',
      meta: {
        name: '追书神器'
      }
    },
    {
      path: '/rankList',
      component: rankList,
      name: 'rankList',
      meta: {
        name: '排行榜'
      }
    },
    {
      path: '/bookDetail/:id',
      component: bookDetail,
      name: 'bookDetail'
    },
    {
      path: '/reader/:id',
      component: reader,
      name: 'reader',
      meta: {
        fullScreen: true
      }
    }
  ]
})
