import Vue from 'vue'
import Firebase from 'firebase'
import Vuex from 'vuex'
import VuexFire from 'vuexfire'
import env from '../../env.js'

Vue.use(Vuex)
Vue.use(VuexFire)

export const firebaseApp = Firebase.initializeApp(env)

export const store = new Vuex.Store({
  state: {
    user: null,
    userObj: null,
    errors: {
      email: '',
      password: ''
    },
    products: null,
    shoppingCart: [],
    searchKey: '',
    orders: null
  },
  mutations: {
    ...VuexFire.mutations,
    user (state, user) {
      state.user = user
    },
    setErrors (state, errors) {
      state.errors.email = errors.email || ''
      state.errors.password = errors.password || ''
    },
    setSearchKey (state, value) {
      state.searchKey = value
    },
    addShoppingCartItem (state, object) {
      state.shoppingCart.push(object)
    },
    incrementQuantity (state, quantityObject) {
      state.shoppingCart[quantityObject.index].quantity += parseInt(quantityObject.quantity)
    },
    emptyShoppingCart (state) {
      state.shoppingCart = []
    }
  },
  actions: {
    signIn ({
      commit,
      state
    }, credentials) {
      firebaseApp.auth().signInWithEmailAndPassword(credentials.email, credentials.password).catch(error => {
        let errorCode = error.code
        let errorMessage = error.message
        switch (errorCode) {
          case 'auth/invalid-email':
          case 'auth/email-already-in-use':
          case 'auth/user-disabled':
          case 'auth/user-not-found':
            {
              let errors = {}
              errors.email = errorMessage
              commit('setErrors', errors)
              break
            }
          case 'auth/weak-password':
          case 'auth/wrong-password':
            {
              let errors = {}
              errors.password = errorMessage
              commit('setErrors', errors)
              break
            }
        }
      })
    },
    createUser ({
      dispatch,
      commit
    }, user) {
      let userCopy = Object.assign({}, user)
      firebaseApp.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(user => {
          user.name = userCopy.name
          user.surname = userCopy.surname
          user.address = userCopy.address
          user.phone = userCopy.phone
          dispatch('saveUser', user)
        })
        .catch(error => {
          let errorCode = error.code
          let errorMessage = error.message
          switch (errorCode) {
            case 'auth/invalid-email':
            case 'auth/email-already-in-use':
            case 'auth/user-disabled':
            case 'auth/user-not-found':
              {
                let errors = {}
                errors.email = errorMessage
                commit('setErrors', errors)
                break
              }
            case 'auth/weak-password':
            case 'auth/wrong-password':
              {
                let errors = {}
                errors.password = errorMessage
                commit('setErrors', errors)
                break
              }
          }
        })
    },
    saveUser ({
      commit,
      state
    }, user) {
      firebaseApp.database().ref('clients/' + user.uid).set({
        name: user.name,
        surname: user.surname,
        address: user.address,
        phone: user.phone,
        email: user.email
      })
    },
    loadUser ({
      commit,
      state
    }, payload) {
      payload.app.$bindAsObject('userObj', firebaseApp.database().ref(`clients/${payload.user.uid}`), () => {})
    },
    updateSearchKey ({commit, state}, value) {
      commit('setSearchKey', value)
    },
    checkOut ({commit, state}, order) {
      order.products.forEach(item => {
        firebaseApp.database().ref('products/' + item.product).update({stock: item.stock})
        delete item.stock
        delete item.price
      })
      if (order.user) {
        firebaseApp.database().ref('orders/' + order.user).push().set({address: order.address, orderValue: order.orderValue, products: order.products, timestamp: order.timestamp})
      } else {
        firebaseApp.database().ref('orders').push().push().set({address: order.address, orderValue: order.orderValue, products: order.products, timestamp: order.timestamp})
      }
    },
    signout (store, payload) {
      payload.$root.$unbind('userObj')
      firebaseApp.auth().signOut()
    }
  },
  getters: {
    userObj: state => state.userObj,
    user: state => state.user,
    currentUser: state => state.user && state.userObj ? state.userObj : null,
    errors: state => state.errors,
    searchKey: state => state.searchKey,
    products: state => state.products,
    shoppingCart: state => state.shoppingCart
  }
})

