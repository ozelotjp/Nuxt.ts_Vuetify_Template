import firebase from 'firebase/app'

declare module 'vue/types/vue' {
  interface Vue {
    $firebase: typeof firebase
  }
}

declare module '@nuxt/types' {
  interface Context {
    $firebase: typeof firebase
  }
  interface NuxtAppOptions {
    $firebase: typeof firebase
  }
}
