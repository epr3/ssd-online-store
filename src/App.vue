<template>
  <v-app class="pb-5" id="app">
  <navbar />
  <v-content>
    <router-view>
      <v-container fluid></v-container>
    </router-view>
  </v-content>
  <v-footer absolute app>Proiect Vue Shop</v-footer>
  </v-app>
</template>

<script>
import navbar from '@/components/Nav'
export default {
  name: 'app',
  components: { navbar }
}

</script>

<style lang="scss">
#app {
  min-height: 100%;
}
</style>
