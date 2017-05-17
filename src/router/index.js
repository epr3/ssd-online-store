import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/AuthForm'
import ProductPage from '@/components/ProductPage'
import ShoppingCart from '@/components/ShoppingCart'

Vue.use(Router)

export default new Router({ routes: [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAnonymous: true }
  },
  {
    path: '/products/:name',
    name: 'ProductPage',
    component: ProductPage
  },
  {
    path: '/mycart',
    name: 'ShoppingCart',
    component: ShoppingCart
  }]
})

