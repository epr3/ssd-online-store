<template>
  <div>
  <template v-if="shoppingCart.length > 0">
    <v-row>
    <v-col xs4 offset-xs4>
    <v-list three-line>
    <template v-for="item in shoppingCart">
      <v-divider />
      <v-list-item :key="item.product">
        <v-list-tile avatar @click.native="openModal(item)">
          <v-list-tile-avatar>
            <img :src="products[item.product].url"/>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="products[item.product].name"/>
            Gender: {{item.gender}}<br>
            Size: {{item.size}}<br>
            Quantity: {{item.quantity}}<br>
            Price: &euro; {{products[item.product].price * item.quantity}}
          </v-list-tile-content>
        </v-list-tile>
      </v-list-item>
    </template>
  </v-list>
  </v-col>
  </v-row>
  <v-row>
  <v-col xs2 offset-xs5>
   <v-text-field v-if="!useUserAddress"
            v-model="billingAddress"
            label="Address"
            single-line
            type="text"
            multi-line
          ></v-text-field>
  <v-checkbox v-if="currentUser" label="Use account billing address" primary v-model="useUserAddress" light />
  <v-btn flat large @click.native="checkOut">
      <v-icon>monetization_on</v-icon>Check out
  </v-btn>
  </v-col>
  </v-row>
  <v-dialog v-model="modalOpen" persistent>
  <v-card>
    <v-card-row>
      <v-card-title>Edit Item</v-card-title>
    </v-card-row>
    <v-card-row>
      <v-card-text v-if="selectedItem">
      {{ products[selectedItem.product].name }}
      <v-select
            v-bind:items="sizes"
            v-model="selectedItem.size"
            label="Size"
            light
            single-line
            auto
          />
          <v-select
            v-bind:items="genders"
            v-model="selectedItem.gender"
            label="Gender"
            light
            single-line
            auto
          />
          <v-text-field
            v-model="selectedItem.quantity"
            label="Quantity"
            min=1
            single-line
            type="number"
          ></v-text-field></v-card-text>
    </v-card-row>
    <v-card-row>
      <v-btn class="green--text darken-1" flat="flat" @click.native="modalOpen = false">Confirm</v-btn>
    </v-card-row>
  </v-card>
</v-dialog>
</template>
<p v-else> You do not have any products in your cart!</p>
  </div>
</template>
<script>
import Vuex from 'vuex'
import moment from 'moment'
export default {
  data () {
    return {
      sizes: ['S', 'M', 'L', 'XL'],
      genders: ['Men', 'Women'],
      modalOpen: false,
      selectedItem: null,
      billingAddress: '',
      useUserAddress: false
    }
  },
  computed: {
    ...Vuex.mapGetters([
      'shoppingCart', 'currentUser', 'products'
    ])
  },
  methods: {
    openModal (item) {
      this.modalOpen = true
      this.selectedItem = item
    },
    checkOut () {
      let order = {}
      let orderValue = 0
      order.products = this.shoppingCart
      order.user = this.currentUser ? this.currentUser['.key'] : null
      order.address = this.useUserAddress ? this.currentUser.address : this.billingAddress
      order.products.forEach(item => {
        item.stock -= parseInt(item.quantity)
        orderValue += parseInt(item.quantity) * item.price
      })
      order.timestamp = moment().unix()
      order.orderValue = orderValue
      this.$store.dispatch('checkOut', order)
      this.$store.commit('emptyShoppingCart')
      this.$router.push({name: 'Index'})
    }
  }
}
</script>
