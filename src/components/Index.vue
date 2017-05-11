<template>
  <v-row class="mt-4">
    <v-col xs2>
      <v-list>
        <v-list-item v-for="i in 8" :key="i">
          <v-list-tile>
            <v-list-tile-title>Item {{ i }}</v-list-tile-title>
          </v-list-tile>
        </v-list-item>
      </v-list>
    </v-col>
    <v-col xs10>
      <v-row>
        <v-col class="mb-4" v-for="i in 8" :key="i" xs3>
          <v-card>
            <v-card-row img="https://lorempixel.com/200/200" height="200px"></v-card-row>
            <v-card-text>
            <v-card-row>Tricou</v-card-row>
            <v-card-row>Colectia X</v-card-row>
            <v-card-row>14.99$</v-card-row>
            </v-card-text>
            <v-card-row actions>
              <v-btn flat class="green--text darken-1">View Email</v-btn>
            </v-card-row>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import Vuex from 'vuex'
export default {
  computed: Vuex.mapGetters([
    'currentUser', 'searchKey'
  ])
}
</script>
