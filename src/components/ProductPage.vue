<template>
  <v-layout row wrap class="ma-4">
      <v-flex xs12>
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
          <v-flex xs2>
          <v-select
            v-bind:items="sizes"
            v-model="selectedSize"
            label="Size"
            light
            single-line
            auto
          />
          </v-flex>
          <v-flex xs2>
          <v-select
            v-bind:items="genders"
            v-model="selectedGender"
            label="Gender"
            light
            single-line
            auto
          />
          </v-flex>
          <v-flex xs2>
          <v-text-field
            v-model="quantity"
            label="Quantity"
            min=1
            single-line
            type="number"
          ></v-text-field>
          </v-flex>
          </v-card-row>
        </v-card-text>
      </v-card-row>
      <v-card-row actions>
        <v-btn v-if="!addedToCart" flat large @click.native="addToCart">
          <v-icon>add_shopping_cart</v-icon>Add to cart
        </v-btn>
        <template v-else>
        <v-btn router flat large :to="{name: 'Index'}"><v-icon>attach_money</v-icon>Continue shopping</v-btn>
        <v-btn router tag="v-btn" flat large :to="{name: 'ShoppingCart'}"><v-icon>shopping_cart</v-icon>View Cart</v-btn>
        </template>
      </v-card-row>
    </v-card-column>
  </v-card>
  </v-flex>
  </v-layout row wrap>
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
      quantity: 1,
      addedToCart: false
    }
  },
  computed: {
    ...Vuex.mapGetters([
      'products', 'shoppingCart'
    ]),
    currentProduct () {
      return this.products.find(product => product.name === this.$route.params.name)
    }
  },
  methods: {
    addToCart () {
      this.addedToCart = true
      let cartItem = {
        product: this.currentProduct['.key'],
        size: this.selectedSize,
        gender: this.selectedGender,
        quantity: this.quantity
      }
      cartItem.stock = this.products[cartItem.product].stock
      cartItem.price = this.products[cartItem.product].price
      if (this.shoppingCart.findIndex(item => cartItem.product === item.product && cartItem.size === item.size && cartItem.gender === item.gender) > -1) this.$store.commit('incrementQuantity', {index: this.shoppingCart.findIndex(item => cartItem.product === item.product && cartItem.size === item.size && cartItem.gender === item.gender), quantity: cartItem.quantity})
      else this.$store.commit('addShoppingCartItem', cartItem)
    }
  },
  watch: {
    quantity (val) {
      if (val < 0) this.quantity = 1
    }
  }
}
</script>
