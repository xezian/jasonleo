<template>
  <div v-if="!onePost" class="bloglist">
    <div>BLOG POSTS</div>
    <div
      v-for="post in posts"
      :key="post.slug"
      class="blog-listing"
      @click="handleClickPost(post.slug)"
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
      onePost: false,
    }
  },
  watch: {
    "$route.params"(newVal) {
      this.loadPostOrPosts(newVal)
    },
  },
  beforeMount() {
    this.loadPostOrPosts(this.$route.params)
  },
  methods: {
    async getPosts() {
      const [_error, response] = await this.$storage.getBlogPosts()
      if (response) {
        this.posts = response
      }
    },
    async getPost(slug) {
      const [_error, response] = await this.$storage.getOnePost(slug)
      if (response) {
        console.log(response)
      }
    },
    handleClickPost(slug) {
      this.$router.push(`/blog/${slug}`)
    },
    loadPostOrPosts(params) {
      if (params.postId) {
        this.onePost = true
        this.getPost(params.postId)
      } else {
        this.onePost = false
        this.getPosts()
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
.bloglist {
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
