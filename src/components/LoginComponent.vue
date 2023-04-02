<template>
  <v-container>
    <v-card>
      <v-card-title>Log In</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="login">
          <v-text-field
              v-model="password"
              label="Password"
              type="password"
              required
          ></v-text-field>
          <v-btn type="submit" color="primary">Log In</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      password: ''
    }
  },
  methods: {
    login() {
      this.$store.commit('setSecretOrg', this.password)
      this.$router.push('/orgs')
    }
  }
}
</script>
