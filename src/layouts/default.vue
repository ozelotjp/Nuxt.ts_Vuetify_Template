<template>
  <v-app>
    <LayoutHeader @toggleDrawer="toggleDrawer" />
    <LayoutAside ref="layoutAsideRef" />
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref } from 'nuxt-composition-api'

export default defineComponent({
  setup() {
    const layoutAsideRef = ref()
    const toggleDrawer = () => {
      layoutAsideRef.value.toggleDrawer()
    }

    return {
      layoutAsideRef,
      toggleDrawer,
    }
  },
})
</script>
