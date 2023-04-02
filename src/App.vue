<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Heroes & Villains</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="!authenticated" to="/login" text>Login</v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item v-for="item in menuItems" :key="item.text" :to="item.to">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: null,
      menuItems: [
        {text: 'Home', to: '/', icon: 'mdi-home'},
        {text: 'About', to: '/about', icon: 'mdi-help-circle'},
        {text: 'Orgs', to: '/orgs', icon: 'mdi-account-group'},
        {text: 'Heroes', to: '/heroes', icon: 'mdi-account-supervisor'},
        {text: 'Teams', to: '/teams', icon: 'mdi-account-group-outline'},
        {text: 'Logout', to: '/login', icon: 'mdi-logout', method: 'logout'}
      ]
    }
  },
  computed: {
    authenticated() {
      return this.$store.state.authenticated
    }
  },
  methods: {
    logout() {
      this.$store.commit('setAuthenticated', false)
      this.$router.push('/login')
    }
  },
  created() {
    this.$store.commit('setAuthenticated', true)
  }
}
</script>



