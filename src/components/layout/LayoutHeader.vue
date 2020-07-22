<template>
  <v-app-bar app clipped-left elevation="1">
    <v-app-bar-nav-icon @click="toggleLeftDrawer" />
    <v-toolbar-title class="d-none d-sm-block">NuxtTS-Template</v-toolbar-title>
    <v-spacer />
    <v-btn icon>
      <v-icon>mdi-help-circle</v-icon>
    </v-btn>
    <template v-if="isAuthenticated">
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn icon @click="toggleRightDrawer">
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
    </template>
    <template v-else>
      <v-btn to="/auth/login" outlined tile>
        <v-icon left>mdi-account-circle</v-icon>
        ログイン
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from 'nuxt-composition-api'

export default defineComponent({
  setup(_, { emit, root: { $firebase } }) {
    const isAuthenticated = ref(false)

    const toggleLeftDrawer = () => {
      emit('toggleDrawer', 'left')
    }

    const toggleRightDrawer = () => {
      emit('toggleDrawer', 'right')
    }

    onBeforeMount(() => {
      $firebase.auth().onAuthStateChanged((user) => {
        isAuthenticated.value = user !== null
      })
    })

    return {
      isAuthenticated,
      toggleLeftDrawer,
      toggleRightDrawer,
    }
  },
})
</script>
