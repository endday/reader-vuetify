import Vue from 'vue'

import {
  Vuetify,
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
    primary: '#ee44aa',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})
