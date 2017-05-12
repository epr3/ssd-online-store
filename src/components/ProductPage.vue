<template>
  <v-row class="ma-4">
      <v-col xs12>
      <v-card horizontal class="pa-3">
    <v-card-row :img="currentProduct.url" height="400px"></v-card-row>
    <v-card-column>
      <v-card-row>
        <v-card-text class="headline">
          <strong><h3>{{ currentProduct.name }}</h3></strong>
          <v-card-row>
            <v-icon>group_work</v-icon>
            {{ currentProduct.category }}</v-card-row>
            <v-card-row>
              <v-icon>euro_symbol</v-icon>
              {{ currentProduct.price }}
            </v-card-row>
            <v-card-row>
            <v-icon>view_list</v-icon>
            {{ currentProduct.stock }}</v-card-row>
          <v-card-row>
          <v-col xs2>
          <v-select
            v-bind:items="sizes"
            v-model="selectedSize"
            label="Size"
            light
            single-line
            auto
          />
          </v-col>
          <v-col xs2>
          <v-select
            v-bind:items="genders"
            v-model="selectedGender"
            label="Gender"
            light
            single-line
            auto
          />
          </v-col>
          <v-col xs2>
          <v-text-field
            v-model="quantity"
            label="Quantity"
            min=1
            single-line
            type="number"
          ></v-text-field>
          </v-col>
          </v-card-row>
        </v-card-text>
      </v-card-row>
      <v-card-row actions>
        <v-btn flat large>
          <v-icon>add_shopping_cart</v-icon>Add to cart
        </v-btn>
      </v-card-row>
    </v-card-column>
  </v-card>
  </v-col>
  </v-row>
</template>
<script>
import Vuex from 'vuex'
export default {
  data () {
    return {
      selectedSize: '',
      selectedGender: '',
      sizes: ['S', 'M', 'L', 'XL'],
      genders: ['Men', 'Women'],
      quantity: 0
    }
  },
  computed: {
    ...Vuex.mapGetters([
      'products'
    ]),
    currentProduct () {
      return this.products.find(product => product.name === this.$route.params.name)
    }
  },
  watch: {
    quantity (val) {
      if (val < 0) this.quantity = 1
    }
  }
}
</script>
