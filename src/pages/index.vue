<template>
  <v-container>
    <p>$vuetify.breakpoint.name: {{ screen }}</p>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, computed } from 'nuxt-composition-api'

export default defineComponent({
  middleware: 'authenticated',
  setup(_, { root: { $vuetify } }) {
    const screen = computed(() => $vuetify.breakpoint.name)

    return {
      screen,
    }
  },
})
</script>
