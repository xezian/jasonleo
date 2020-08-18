<template>
  <div class="blog">
    <div>BLOG</div>
    <div v-for="post in posts" :key="post.slug">
      <p>Title: {{ post.title }}</p>
      <p>Slug: {{ post.slug }}</p>
      <p>Post: {{ post.content }}</p>
      {{ post }}
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      posts: [],
    }
  },
  beforeMount() {
    this.getPosts()
  },
  methods: {
    async getPosts() {
      const [_error, response] = await this.$api.get("/blog")
      if (response) {
        this.posts = response.data
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
.blog {
  text-align: center;
}
</style>
