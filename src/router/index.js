import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/AuthForm'
import ProductPage from '@/components/ProductPage'

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
    path: '/:name',
    name: 'ProductPage',
    component: ProductPage
  }]
})

