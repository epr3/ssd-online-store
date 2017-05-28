<template>
  <v-layout row wrap class="mt-4">
    <v-flex xs2>
      <v-list>
        <v-list-item v-for="category in categories" :key="category" :class="{'grey lighten-2': selectedCategory === category}">
          <v-list-tile @click.native="selectedCategory = category">
            <v-list-tile-title>{{ category }}</v-list-tile-title>
          </v-list-tile>
        </v-list-item>
      </v-list>
      <v-select
            class="ma-2"
            v-bind:items="sortValues"
            v-model="sort"
            label="Sort"
            light
            single-line
            auto
          />
    </v-flex>
    <v-flex xs10>
       <v-layout row wrap>
          <v-flex xs4 class="mb-4" v-for="item in computedProducts" :key="item">
          <router-link tag="v-card" :to="{name:'ProductPage', params: { product: item.name }}" class="pa-2">
            <v-card-row :img="item.url" height="250px"></v-card-row>
            <v-card-text>
            <v-card-row><strong>{{ item.name }}</strong></v-card-row>
            <v-card-row>
            <v-icon>group_work</v-icon>
            {{ item.category }}</v-card-row>
            <v-card-row>
              <v-icon>euro_symbol</v-icon>
              {{ item.price }}
            </v-card-row>
            <v-card-row>
            <v-icon>view_list</v-icon>
            {{ item.stock }}</v-card-row>
            </v-card-text>
          </router-link>
          </v-flex>
        </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import Vuex from 'vuex'
export default {
  data () {
    return {
      selectedCategory: 'All',
      categories: ['T-Shirts', 'Jeans', 'Jackets', 'All'],
      sortValues: ['Alphabetically A-Z', 'Alphabetically Z-A', 'Price lowest to highest', 'Price highest to lowest', 'None'],
      sort: ''
    }
  },
  computed: {
    ...Vuex.mapGetters([
      'currentUser', 'searchKey', 'products'
    ]),
    computedProducts () {
      let compProd
      if (this.selectedCategory === 'All') compProd = this.products
      else compProd = this.products.filter(product => product.category === this.selectedCategory)
      return compProd.filter(product => product.name.toLowerCase().includes(this.searchKey)).sort((a, b) => {
        switch (this.sort) {
          case 'Alphabetically A-Z': return a.name < b.name
          case 'Alphabetically Z-A': return a.name > b.name
          case 'Price lowest to highest': return a.price - b.price
          case 'Price highest to lowest': return b.price - a.price
          default: return 0
        }
      })
    }
  }
}
</script>
