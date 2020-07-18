<template>
  <v-app-bar app clipped-left elevation="1">
    <v-app-bar-nav-icon @click="toggleDrawer" />
    <v-toolbar-title class="d-none d-sm-block">
      NuxtTS-Template
    </v-toolbar-title>
    <v-spacer />
    <v-btn v-if="isAuthenticated" to="/auth/logout" outlined tile>
      <v-icon left>
        mdi-logout-variant
      </v-icon>
      ログアウト
    </v-btn>
    <v-btn v-else to="/auth/login" outlined tile>
      <v-icon left>
        mdi-login-variant
      </v-icon>
      ログイン
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent, ref } from 'nuxt-composition-api'

export default defineComponent({
  setup(_, { emit, root: { $firebase } }) {
    const toggleDrawer = () => {
      emit('toggleDrawer')
    }

    const isAuthenticated = ref($firebase.auth().currentUser !== null)
    $firebase.auth().onAuthStateChanged((user) => {
      isAuthenticated.value = user !== null
    })

    return {
      toggleDrawer,
      isAuthenticated,
    }
  },
})
</script>
