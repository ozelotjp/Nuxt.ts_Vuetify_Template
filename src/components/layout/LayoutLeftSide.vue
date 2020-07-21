<template>
  <v-navigation-drawer v-model="drawer" app clipped :bottom="isScreenXs">
    <v-container class="text-center d-lg-none">
      NuxtTS-Template
    </v-container>
    <div v-for="(list, listIndex) in drawerList" :key="`list-${listIndex}`">
      <v-divider v-if="listIndex !== 0" />
      <v-list dense nav :subheader="typeof list.subheader !== 'undefined'">
        <v-subheader v-if="typeof list.subheader !== 'undefined'">
          {{ list.subheader }}
        </v-subheader>
        <v-list-item-group color="primary">
          <v-list-item
            v-for="(item, itemIndex) in list.items"
            :key="`list-${itemIndex}`"
            :to="item.to"
          >
            <v-list-item-icon v-if="typeof item.icon !== 'undefined'">
              <v-icon>
                {{ item.icon }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-avatar v-if="typeof item.img !== 'undefined'">
              <v-img :src="item.img" />
            </v-list-item-avatar>
            <v-list-item-content>
              {{ item.text }}
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </div>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'nuxt-composition-api'

interface IDrawerList {
  subheader?: string
  items: {
    text: string
    to: string
    icon?: string
    img?: string
  }[]
}

export default defineComponent({
  setup(_, { root: { $vuetify } }) {
    const drawer = ref(null as boolean | null)
    const isScreenXs = computed(() => $vuetify.breakpoint.xs)

    const drawerList = [
      {
        items: [
          { text: 'ホーム', to: '/', icon: 'mdi-home' },
          { text: 'ホーム', to: '/hogehoge', icon: 'mdi-home' },
        ],
      },
    ] as IDrawerList[]

    const toggleDrawer = () => {
      drawer.value = !drawer.value
    }

    return {
      drawer,
      isScreenXs,
      drawerList,
      toggleDrawer,
    }
  },
})
</script>
