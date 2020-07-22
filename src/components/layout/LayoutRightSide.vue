<template>
  <v-navigation-drawer v-model="drawer" absolute clipped right temporary>
    <v-list dense nav>
      <v-list-item-group>
        <v-list-item two-line disabled>
          <v-list-item-avatar>
            <v-icon>mdi-account-circle</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="black--text" v-text="account.name" />
            <v-list-item-subtitle v-text="account.description" />
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      <v-divider />
      <v-list-item-group color="primary">
        <v-list-item to="/auth/logout">
          <v-list-item-icon>
            <v-icon>mdi-logout-variant</v-icon>
          </v-list-item-icon>
          <v-list-item-content>ログアウト</v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  onBeforeMount,
} from 'nuxt-composition-api'

export default defineComponent({
  setup(_, { root: { $firebase } }) {
    const drawer = ref(false)
    const account = reactive({
      name: '',
      description: '',
    })

    const toggleDrawer = () => {
      drawer.value = !drawer.value
    }

    onBeforeMount(() => {
      $firebase.auth().onAuthStateChanged((user) => {
        if (user !== null) {
          if (user.isAnonymous) {
            account.name = 'ななしさん'
            account.description = 'ログイン済み（お試し）'
          } else {
            account.name = user.displayName || 'undefined'
            account.description = 'ログイン済み'
          }
        }
      })
    })

    return {
      drawer,
      account,
      toggleDrawer,
    }
  },
})
</script>
