<template>
  <v-row class="mt-4">
    <v-col xs2>
      <v-list>
        <v-list-item v-for="category in categories" :key="category" :class="{'grey lighten-2': selectedCategory === category}">
          <v-list-tile @click.native="selectedCategory = category">
            <v-list-tile-title>{{ category }}</v-list-tile-title>
          </v-list-tile>
        </v-list-item>
      </v-list>
    </v-col>
    <v-col xs10>
      <v-row>
        <v-col class="mb-4" v-for="item in computedProducts" :key="item" xs3>
          <router-link tag="v-card" :to="{name:'ProductPage', params: { name: item.name }}" class="pa-2">
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
            <!-- <v-card-row actions>
              <v-btn flat class="red--text darken-1">
                <v-icon>favorite_border</v-icon>
              </v-btn>
            </v-card-row> -->
          </router-link>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import Vuex from 'vuex'
export default {
  data () {
    return {
      selectedCategory: 'All',
      categories: ['T-Shirts', 'Jeans', 'Jackets', 'All']
    }
  },
  computed: {
    ...Vuex.mapGetters([
      'currentUser', 'searchKey', 'products'
    ]),
    computedProducts () {
      if (this.selectedCategory === 'All') return this.products
      else return this.products.filter(product => product.category === this.selectedCategory)
    }
  }
}
</script>
