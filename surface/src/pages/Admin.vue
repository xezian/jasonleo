<template>
  <div v-if="$auth.user" class="admin">
    ADMIN
    <button @click="logOut">Bye</button>
    <Post />
  </div>
  <div v-else class="admin">
    <div>You are not logged in</div>
    <input v-model="username" type="email" /><br />
    <input v-model="password" type="password" /><br />
    <button @click="logIn">Try</button>
  </div>
</template>

<script>
import Post from "../components/Post"
export default {
  components: {
    Post,
  },
  data: function () {
    return {
      username: null,
      password: null,
    }
  },
  methods: {
    async logIn() {
      try {
        await this.$auth.signIn(this.username, this.password)
      } catch (error) {
        console.log("error signing in", error)
      }
    },
    async logOut() {
      try {
        await this.$auth.signOut({ global: true })
      } catch (error) {
        console.log("error signing out", error)
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
.admin {
  text-align: center;
}
</style>
