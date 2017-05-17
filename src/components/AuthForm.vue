<template>
<v-card>
  <v-card-text>
  <form novalidate @submit.stop.prevent>
  <v-container fluid v-if="loginMode">
      <v-row row>
        <v-col xs4>
          <v-subheader>E-mail</v-subheader>
        </v-col>
        <v-col xs6>
          <v-text-field
            name="input-1"
            v-model="email"
            :rules="errors.email"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row row>
        <v-col xs4>
          <v-subheader>Password</v-subheader>
        </v-col>
        <v-col xs6>
          <v-text-field
            name="input-2"
            v-model="password"
            type="password"
            :rules="errors.password"
          ></v-text-field>
        </v-col>
      </v-row>
      <div>
          <v-btn light flat @click.native="signIn">Login</v-btn>
        </div>
    </v-container>
    </form>
    <form novalidate @submit.stop.prevent>
    <v-container fluid v-if="!loginMode">
      <v-row row>
        <v-col xs4>
          <v-subheader>Name</v-subheader>
        </v-col>
        <v-col xs8>
          <v-text-field
            name="input-1"
            v-model="name"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row row>
        <v-col xs4>
          <v-subheader>Surname</v-subheader>
        </v-col>
        <v-col xs8>
          <v-text-field
            name="input-1"
            v-model="surname"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row row>
        <v-col xs4>
          <v-subheader>E-mail</v-subheader>
        </v-col>
        <v-col xs8>
          <v-text-field
            name="input-1"
            v-model="email"
             v-bind:rules="[errors.email,errors.password]"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row row>
        <v-col xs4>
          <v-subheader>Address</v-subheader>
        </v-col>
        <v-col xs8>
          <v-text-field
            name="input-1"
            v-model="address"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row row>
        <v-col xs4>
          <v-subheader>Phone</v-subheader>
        </v-col>
        <v-col xs8>
          <v-text-field
            name="input-1"
            v-model="phone"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row row>
        <v-col xs4>
          <v-subheader>Password</v-subheader>
        </v-col>
        <v-col xs8>
          <v-text-field
            name="input-1"
            v-model="password"
            type="password"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row row>
        <v-col xs4>
          <v-subheader>Confirm password</v-subheader>
        </v-col>
        <v-col xs8>
          <v-text-field
            name="input-1"
            v-model="confirmPassword"
            type="password"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
    </form>
    </v-card-text>
    <div>
      <v-btn light flat v-if="loginMode" @click.native="loginMode = false">Don't have an account?</v-btn>
    </div>
    <div>
      <v-btn light flat v-if="!loginMode" @click.native="register">Register</v-btn>
    </div>
    <v-snackbar
    timeout=3000
    v-model="snackbar"
  > {{ snackBarText }}</v-snackbar>
  </v-card>
</template>

<script>
import Vuex from 'vuex'
export default {
  name: 'auth',
  data () {
    return {
      name: '',
      surname: '',
      confirmPassword: '',
      address: '',
      phone: '',
      email: '',
      password: '',
      loginMode: true,
      snackbar: false,
      snackbarText: ''
    }
  },
  computed: {
    ...Vuex.mapGetters([
      'currentUser', 'errors'
    ])
  },
  watch: {
    currentUser (n, o) {
      if (n) this.$router.push({ name: 'Index' })
    },
    email () {
      this.$store.commit('setErrors', {
        email: ''
      })
    },
    password () {
      this.$store.commit('setErrors', {
        password: ''
      })
    }
  },
  methods: {
    signIn () {
      this.$store.dispatch('signIn', {
        email: this.email,
        password: this.password
      })
    },
    register () {
      if (this.password === this.confirmPassword) {
        this.$store.dispatch('createUser', {
          name: this.name,
          surname: this.surname,
          phone: this.phone,
          address: this.address,
          email: this.email,
          password: this.password
        })
      } else {
        this.snackbarText = 'Passwords do not match'
        this.snackbar = true
      }
    }
  }
}
</script>

<style scoped>

</style>
