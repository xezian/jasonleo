<template>
  <div class="blog">
    <div>BLOG</div>
    <div v-for="post in posts" :key="post.slug">
      <p>Title: {{ post.title }}</p>
      <p>Date: {{ post.date }}</p>
      <p>Description: {{ post.description }}</p>
      <p>Tags: {{ post.tags }}</p>
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
    async getPosts(startPage) {
      const [_error, response] = await this.$storage.getBlogPosts(startPage)
      if (response) {
        this.posts = response
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
