<template>
  <div class="blog-box">
    <div v-if="!onePost">
      <div>BLOG POSTS</div>
      <div
        v-for="listing in posts"
        :key="listing.slug"
        class="blog-listing"
        @click="handleClickPost(listing.slug)"
      >
        <p>Title: {{ listing.title }}</p>
        <p>Date: {{ listing.date }}</p>
        <p>Description: {{ listing.description }}</p>
        <p>Tags: {{ listing.tags }}</p>
      </div>
    </div>
    <div v-else class="blog-post">
      <VueShowdown :markdown="post" :extensions="[showdownHighlight]" />
    </div>
  </div>
</template>

<script>
import showdownHighlight from "showdown-highlight"
export default {
  data: function () {
    return {
      posts: [],
      post: "",
      onePost: false,
      showdownHighlight: showdownHighlight,
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
        this.post = response
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
.blog-box {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.blog-listing {
  /* border: 1px solid black; */
  border-radius: 10px 50px 50px 10px;
  width: 30vw;
  cursor: url("/brackets.ico"), auto;
  padding: 10px;
  background: linear-gradient(to left top, #147b83, #e485c7);
  box-shadow: 0px 0px 100px 50px #c1c1ff;
}
.blog-post {
  width: 80vw;
  padding: 2em;
  background: linear-gradient(to right top, #e0bed6, #809fa1) fixed;
}
.blog-post >>> code {
  padding: 2px 5px;
  min-width: 100%;
  border-radius: 5px;
  background-color: lightgoldenrodyellow;
  color: dimgray;
}
.blog-post >>> pre code {
  padding: 10px;
  display: inline-block;
  background-color: dimgray;
  color: lightgoldenrodyellow;
}
.blog-post >>> blockquote {
  background-color: #f5f5f54f;
  padding: 1px 10px;
  border-left: 5px solid gainsboro;
}
.blog-post >>> blockquote:hover {
  border-left: 5px solid lightgrey;
}
@media only screen and (max-width: 600px) {
  .blog-post {
    width: 95vw;
  }
}
</style>
