<template>
  <div>
    <v-card horizontal v-for='item in shoppingCart' class="pa-4" :key="item">
    <v-card-row :img="products[item.product].url" height="250px" class="pa-2"></v-card-row>
    <v-card-column>
      <v-card-row>
        <v-card-text>
          <strong>{{ products[item.product].name }}</strong>
          <div>{{ item.size }}</div>
          <div>{{ item.gender }}</div>
        </v-card-text>
      </v-card-row>
      <v-card-row actions>
        <v-btn flat>
          <v-icon left>directions</v-icon>Directions
        </v-btn>
      </v-card-row>
    </v-card-column>
    </v-card>
  </div>
</template>
<script>
import Vuex from 'vuex'
export default {
  computed: {
    ...Vuex.mapGetters([
      'shoppingCart', 'currentUser', 'products'
    ])
  }
}
</script>
