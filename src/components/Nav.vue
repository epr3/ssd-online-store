<template>
<v-toolbar>
  <router-link tag="v-toolbar-title" :to="{name: 'Index'}">Vue Mini Shop</router-link>
  <v-toolbar-items>
    <v-toolbar-item ripple>
    <v-text-field prepend-icon="search" label="Search..." v-model="localKey" @keyup.enter.native="save" hide-details single-line dark>
    </v-text-field>
    </v-toolbar-item>
    <v-toolbar-item>
    <v-menu bottom left offset-y origin="top right" transition="v-slide-y-transition">
      <v-btn flat dark slot="activator">
      Category
        <v-icon>more_vert</v-icon>
      </v-btn>
      <v-list>
        <v-list-item>
          <v-list-tile>
            <v-list-tile-title></v-list-tile-title>
          </v-list-tile>
        </v-list-item>
      </v-list>
    </v-menu>
    </v-toolbar-item>
    <v-toolbar-item>
    Shopping cart <v-icon>shopping_cart</v-icon>
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
    'currentUser', 'searchKey'
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
