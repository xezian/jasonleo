<template>
  <div class="blog-box">
    <div v-if="!onePost">
      <div
        v-for="listing in posts"
        :key="listing.slug"
        class="blog-listing"
        @click="handleClickPost(listing.slug)"
      >
        <p>Title: {{ listing.title }}</p>
        <p>Date: {{ listing.date }}</p>
        <p>Description: {{ listing.description }}</p>
        <div v-for="tag in listing.tags" :key="tag" class="tag-badge">
          {{ tag }}
        </div>
      </div>
    </div>
    <div v-else class="blog-post">
      <div class="back-up back-up-top" @click="backUp">&#171;</div>
      <VueShowdown :markdown="post" :extensions="[showdownHighlight]" />
      <div class="back-up back-up-bottom" @click="backUp">&#171;</div>
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
    backUp() {
      this.$router.push("/blog")
    },
  },
}
</script>

<style lang="postcss" scoped>
.back-up {
  z-index: 1;
  font-size: 37pt;
  cursor: pointer;
  color: #42baff;
}
.back-up:hover {
  color: #fde830;
}
.back-up:active {
  color: #e877ff;
}
.back-up-top {
  position: relative;
  left: 20px;
  top: -40px;
}
.back-up-bottom {
  position: relative;
  left: 0px;
  bottom: -40px;
}
.blog-box {
  width: 100vw;
  padding-top: 5em;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.blog-listing {
  /* border: 1px solid black; */
  border-radius: 10px 60px 50px 10px;
  width: 30vw;
  cursor: url("/brackets.ico"), auto;
  padding: 15px;
  margin: 10px 0;
  background: linear-gradient(to left top, #147b83, #e485c7);
  box-shadow: 0px 0px 100px 50px #c1c1ff;
}
.tag-badge {
  border: 1px solid #4f4f91;
  background: #4f4f917c;
  color: #f1f1f1;
  border-radius: 13px;
  width: fit-content;
  padding: 0 7px;
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
