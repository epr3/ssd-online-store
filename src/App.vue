<template>
  <v-app id="app">
  <navbar />
  <main>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </main>
  <v-footer>Proiect Vue Shop</v-footer>
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
</style>
