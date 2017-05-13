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

let app = new Vue({
  el: '#app',
  name: 'App',
  data: {
    loading: true
  },
  router,
  render: h => h(require('./App')),
  store: store,
  firebase: {
    products: firebaseApp.database().ref('products')
  },
  mounted () {
    this.loading = false
    firebaseApp.auth().onAuthStateChanged(user => {
      if (user !== null) {
        store.dispatch('loadUser', { user, app })
      }
      store.commit('user', user)
    })
  }
})
