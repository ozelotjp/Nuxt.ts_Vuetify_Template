<script lang="ts">
import { defineComponent } from 'nuxt-composition-api'

export default defineComponent({
  setup(_, { root: { $firebase, $router } }) {
    $firebase
      .auth()
      .signOut()
      .then(() => {
        $router.push('/')
      })
  },
})
</script>
