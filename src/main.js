import Vue from 'vue'
import Vuetify from 'vuetify'
import router from '@/router'
import { store, firebaseApp } from '@/store'

Vue.use(Vuetify)

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAnonymous)) {
    if (store.getters.currentUser) {
      next(false)
    } else {
      next()
    }
  } else {
    next()
  }
})

var app = null
/* eslint-disable no-new */
firebaseApp.auth().onAuthStateChanged(user => {
/* eslint-disable no-new */
  if (!app) {
    app = new Vue({
      el: '#app',
      name: 'App',
      router,
      render: h => h(require('./App')),
      store: store,
      firebase: {
      }
    })
  }
  if (user !== null) {
    store.dispatch('loadUser', { user, app })
  }
  store.commit('user', user)
})

