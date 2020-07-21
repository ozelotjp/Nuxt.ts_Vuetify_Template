<template>
  <v-navigation-drawer v-model="drawer" absolute clipped right temporary>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'nuxt-composition-api'

export default defineComponent({
  setup() {
    const drawer = ref(false)

    const toggleDrawer = () => {
      drawer.value = !drawer.value
    }

    return {
      drawer,
      toggleDrawer,
    }
  },
})
</script>
