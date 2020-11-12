import { defineNuxtMiddleware } from '@nuxtjs/composition-api'
import firebase from 'firebase'

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
        redirect(`/auth/login?before=${encodeURI(route.fullPath)}`)
      })
  }
)

export default myMiddleware
