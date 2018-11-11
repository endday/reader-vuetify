import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import {
  VApp,
  VTabs,
  VFooter,
  VList,
  VDivider,
  VCard,
  VBtn,
  VIcon,
  VRating,
  VImg,
  VGrid,
  VToolbar,
  VBottomNav,
  transitions
} from 'vuetify'

Vue.use(Vuetify, {
  components: {
    VApp,
    VTabs,
    VFooter,
    VList,
    VDivider,
    VCard,
    VBtn,
    VIcon,
    VRating,
    VImg,
    VGrid,
    VToolbar,
    VBottomNav,
    transitions
  },
  theme: {
    primary: '#616161',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  },
  customProperties: true,
  iconfont: 'md'
})
