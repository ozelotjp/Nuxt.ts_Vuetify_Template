<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="11" sm="7" md="5" lg="5" xl="3">
        <v-card>
          <v-toolbar dense dark>
            <v-spacer />
            <v-toolbar-title>ログイン</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <p>
                  ログインを行うと「<nuxt-link to="/docs/tos"
                    >利用規約</nuxt-link
                  >」と「<nuxt-link to="/docs/privacy"
                    >プライバシーポリシー</nuxt-link
                  >」に同意したものとみなします。
                </p>
              </v-col>
              <v-col cols="12">
                <v-btn
                  block
                  class="text-capitalize"
                  color="primary"
                  @click="signInWithGoogle"
                >
                  <v-icon left>mdi-google</v-icon>
                  Googleでログイン
                </v-btn>
              </v-col>
              <v-col cols="12">
                <v-btn
                  block
                  class="text-capitalize"
                  color="primary"
                  @click="signInWithTwitter"
                >
                  <v-icon left>mdi-twitter</v-icon>
                  Twitterでログイン
                </v-btn>
              </v-col>
              <v-col cols="12">
                <v-btn
                  block
                  class="text-capitalize"
                  color="primary"
                  @click="signInWithGitHub"
                >
                  <v-icon left>mdi-github</v-icon>
                  GitHubでログイン
                </v-btn>
              </v-col>
              <v-col cols="12">
                <v-btn
                  block
                  class="text-capitalize"
                  @click="openAnonymouslyWarningDialog"
                >
                  <v-icon left>mdi-incognito</v-icon>
                  お試しログイン
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="state.anonymouslyWarningDialog" width="500">
      <v-card>
        <v-card-title> お試しログイン </v-card-title>
        <v-card-text>
          <ul>
            <li>
              これはなに？
              <ul>
                <li><u>ちょっとお試しで使ってみたい</u>人向けの機能です。</li>
                <li>あなた専用の<u>一時的なアカウント</u>を発行します。</li>
              </ul>
            </li>
            <li>
              "一時的なアカウント"の注意点
              <ul>
                <li>
                  ログアウトをすると元の"一時的なアカウント"にはログインできません。
                </li>
                <li>
                  他の端末から"一時的なアカウント"にはログインできません。
                </li>
                <li>"一時的なアカウント"は突然に削除されることがあります。</li>
              </ul>
            </li>
          </ul>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="closeAnonymouslyWarningDialog">キャンセル</v-btn>
          <v-spacer />
          <v-btn
            color="primary"
            :loading="state.anonymouslyLoading"
            @click="signInWithAnonymously"
            >お試しログインを行う</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

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
        <v-icon> mdi-close </v-icon>
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
import { defineComponent, reactive } from '@nuxtjs/composition-api'
import { authenticatedStore } from '@/store'

export default defineComponent({
  setup(_, { root: { $firebase, $router } }) {
    const state = reactive({
      loading: true,
      anonymouslyWarningDialog: false,
      anonymouslyLoading: false,
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
      state.anonymouslyLoading = true
      $firebase.auth().signInAnonymously()
    }

    const openAnonymouslyWarningDialog = () => {
      state.anonymouslyWarningDialog = true
    }

    const closeAnonymouslyWarningDialog = () => {
      state.anonymouslyWarningDialog = false
    }

    return {
      state,
      signInWithGoogle,
      signInWithTwitter,
      signInWithGitHub,
      signInWithAnonymously,
      openAnonymouslyWarningDialog,
      closeAnonymouslyWarningDialog,
    }
  },
})
</script>
