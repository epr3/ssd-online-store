<template>
<v-toolbar>
  <router-link tag="v-toolbar-title" :to="{name: 'Index'}">Vue Mini Shop</router-link>
  <v-toolbar-items>
    <v-toolbar-item class="white--text" ripple>
    <v-text-field  prepend-icon="search" label="Search..." v-model="localKey" @keyup.enter.native="save" hide-details single-line light>
    </v-text-field>
    </v-toolbar-item>
    <v-toolbar-item router :to="{name: 'ShoppingCart'}">
    Shopping cart <v-icon v-badge="{value: shoppingCart.length, right: true}" class="white--text red--after">shopping_cart</v-icon>
    </v-toolbar-item>
    <v-toolbar-item v-if="!currentUser" :to="{name: 'Login'}" router>Login</v-toolbar-item>
    <v-toolbar-item v-if="currentUser" @click.native="signOut" ripple>Sign out</v-toolbar-item>
  </v-toolbar-items>
</v-toolbar>
</template>
<script>
import Vuex from 'vuex'
export default {
  data () {
    return {
      localKey: ''
    }
  },
  name: 'navbar',
  computed: Vuex.mapGetters([
    'currentUser', 'shoppingCart'
  ]),
  methods: {
    signOut () {
      this.$store.dispatch('signout', this)
    },
    save () {
      console.log(this.localKey)
      this.$store.dispatch('updateSearchKey', this.localKey)
    }
  },
  watch: {
    localKey () {
      this.$store.dispatch('updateSearchKey', this.localKey)
    }
  }
}
</script>
