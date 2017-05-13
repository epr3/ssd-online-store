<template>
  <v-app id="app">
  <navbar />
  <main>
  <v-progress-circular v-if="loading" size="150" indeterminate class="primary--text loader" />
    <v-content v-if="!loading">
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </main>
  <v-footer>Proiect SSD Vue Shop</v-footer>
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
.loader{
  position: relative;
  top: 50%;
  left: 50%;
}
</style>
