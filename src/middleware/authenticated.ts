import { authenticatedStore } from '@/store'
import { defineNuxtMiddleware } from '@nuxtjs/composition-api'

const myMiddleware = defineNuxtMiddleware(
  async ({ app: { $firebase }, redirect, route }) => {
    await new Promise<firebase.User>((resolve, reject) => {
      $firebase
        .auth()
        .onAuthStateChanged((user) =>
          user === null ? reject(new Error()) : resolve(user)
        )
    })
      .then(() => {
        //
      })
      .catch(() => {
        authenticatedStore.setNextUrl(route.fullPath)
        redirect('/auth/login')
      })
  }
)

export default myMiddleware
