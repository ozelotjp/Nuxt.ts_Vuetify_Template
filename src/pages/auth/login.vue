<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="11" sm="7" md="5" lg="5" xl="3">
        <v-card>
          <v-toolbar dense dark>
            <v-spacer />
            <v-toolbar-title>
              ログイン
            </v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-btn block class="text-capitalize" @click="signInWithGoogle">
                  <v-icon left>
                    mdi-google
                  </v-icon>
                  Googleでログイン
                </v-btn>
              </v-col>
              <v-col cols="12">
                <v-btn block class="text-capitalize" @click="signInWithTwitter">
                  <v-icon left>
                    mdi-twitter
                  </v-icon>
                  Twitterでログイン
                </v-btn>
              </v-col>
              <v-col cols="12">
                <v-btn block class="text-capitalize" @click="signInWithGitHub">
                  <v-icon left>
                    mdi-github
                  </v-icon>
                  GitHubでログイン
                </v-btn>
              </v-col>
              <v-col cols="12">
                <v-divider />
              </v-col>
              <v-col cols="12">
                <v-btn
                  block
                  class="text-capitalize"
                  @click="signInWithAnonymously"
                >
                  <v-icon left>
                    mdi-incognito
                  </v-icon>
                  お試し利用（ゲスト）
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-overlay v-model="state.loading">
      <v-progress-circular indeterminate size="64" />
    </v-overlay>

    <v-snackbar
      v-model="state.errorNotify.show"
      left
      bottom
      :timeout="6000"
      color="error"
      multi-line
    >
      {{ state.errorNotify.text }}
      <v-btn icon @click="state.errorNotify.show = false">
        <v-icon>
          mdi-close
        </v-icon>
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<style scoped>
.bg-google {
  background-color: #4285f4 !important;
  border-color: #4285f4 !important;
}

.bg-apple {
  background-color: #000 !important;
  border-color: #000 !important;
}

.bg-twitter {
  background-color: #1da1f2 !important;
  border-color: #1da1f2 !important;
}

.bg-github {
  background-color: #181717 !important;
  border-color: #181717 !important;
}
</style>

<script lang="ts">
import { defineComponent, reactive } from 'nuxt-composition-api'
import { authenticatedStore } from '@/store'

export default defineComponent({
  setup(_, { root: { $firebase, $router } }) {
    const state = reactive({
      loading: true,
      errorNotify: {
        show: false,
        text: '',
      },
    })

    $firebase.auth().onAuthStateChanged((user) => {
      if (user !== null) {
        $router.push(authenticatedStore.nextUrl)
        return
      }
      state.loading = false
    })

    const signInWithGoogle = () => {
      state.loading = true
      $firebase
        .auth()
        .signInWithRedirect(new $firebase.auth.GoogleAuthProvider())
    }

    const signInWithTwitter = () => {
      state.loading = true
      $firebase
        .auth()
        .signInWithRedirect(new $firebase.auth.TwitterAuthProvider())
    }

    const signInWithGitHub = () => {
      state.loading = true
      $firebase
        .auth()
        .signInWithRedirect(new $firebase.auth.GithubAuthProvider())
    }

    const signInWithAnonymously = () => {
      state.loading = true
      $firebase.auth().signInAnonymously()
    }

    return {
      state,
      signInWithGoogle,
      signInWithTwitter,
      signInWithGitHub,
      signInWithAnonymously,
    }
  },
})
</script>
