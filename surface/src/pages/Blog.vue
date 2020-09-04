<template>
  <div class="blog">
    <div>BLOG</div>
    <div
      v-for="post in posts"
      :key="post.slug"
      class="blog-listing"
      @click="goToPost(post.slug)"
    >
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
    async getPosts() {
      const [_error, response] = await this.$storage.getBlogPosts()
      if (response) {
        this.posts = response
      }
    },
    async goToPost(slug) {
      const [_error, response] = await this.$storage.getOnePost(slug)
      if (response) {
        console.log(response)
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
.blog {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.blog-listing {
  border: 1px solid black;
  border-radius: 7px 33px 22px 61px;
  width: 30vw;
  cursor: url("/brackets.ico"), auto;
  padding: 10px;
}
</style>
