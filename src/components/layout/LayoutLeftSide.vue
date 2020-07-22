<template>
  <v-navigation-drawer v-model="drawer" app clipped :bottom="isScreenXs">
    <v-container class="text-center d-lg-none">
      NuxtTS-Template
    </v-container>
    <v-list dense nav>
      <v-list-item-group color="primary">
        <v-list-item to="/">
          <v-list-item-icon>
            <v-icon>
              mdi-home
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            ホーム
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'nuxt-composition-api'

export default defineComponent({
  setup(_, { root: { $vuetify } }) {
    const drawer = ref(null as boolean | null)
    const isScreenXs = computed(() => $vuetify.breakpoint.xs)

    const toggleDrawer = () => {
      drawer.value = !drawer.value
    }

    return {
      drawer,
      isScreenXs,
      toggleDrawer,
    }
  },
})
</script>
