<template>
  <div class="project-box">
    <div v-if="!oneProject">
      <div
        v-for="listing in projects"
        :key="listing.slug"
        class="listing"
        @click="handleClickProject(listing.slug)"
      >
        <p>Title: {{ listing.title }}</p>
        <p>Description: {{ listing.description }}</p>
        <p>Tags: {{ listing.tags }}</p>
        <img
          :href="`https://jason-leo.s3.amazonaws.com/blog/images/${listing.cover}`"
        />
      </div>
    </div>
    <div v-else class="project">
      <div class="back-up back-up-top" @click="backUp">&#171;</div>
      <VueShowdown :markdown="project" :extensions="[showdownHighlight]" />
      <div class="back-up back-up-bottom" @click="backUp">&#171;</div>
    </div>
  </div>
</template>

<script>
import showdownHighlight from "showdown-highlight"
export default {
  data: function () {
    return {
      projects: [],
      project: "",
      oneProject: false,
      showdownHighlight: showdownHighlight,
    }
  },
  watch: {
    "$route.params"(newVal) {
      this.loadProjectOrProjects(newVal)
    },
  },
  beforeMount() {
    this.loadProjectOrProjects(this.$route.params)
  },
  methods: {
    async getProjects() {
      const [_error, response] = await this.$storage.getProjects()
      if (response) {
        this.projects = response
      }
    },
    async getProject(slug) {
      const [_error, response] = await this.$storage.getOneProject(slug)
      if (response) {
        this.project = response
      }
    },
    handleClickProject(slug) {
      this.$router.push(`/projects/${slug}`)
    },
    loadProjectOrProjects(params) {
      if (params.projectId) {
        this.oneProject = true
        this.getProject(params.projectId)
      } else {
        this.oneProject = false
        this.getProjects()
      }
    },
    backUp() {
      this.$router.push("/projects")
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
.project-box {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.listing {
  /* border: 1px solid black; */
  border-radius: 10px 60px 50px 10px;
  width: 30vw;
  cursor: url("/brackets.ico"), auto;
  padding: 15px;
  margin: 10px 0;
  background: linear-gradient(to left top, #147b83, #e485c7);
  box-shadow: 0px 0px 100px 50px #c1c1ff;
}
.project {
  width: 80vw;
  padding: 2em;
  background: linear-gradient(to right top, #e0bed6, #809fa1) fixed;
}
.project >>> code {
  padding: 2px 5px;
  min-width: 100%;
  border-radius: 5px;
  background-color: lightgoldenrodyellow;
  color: dimgray;
}
.project >>> pre code {
  padding: 10px;
  display: inline-block;
  background-color: dimgray;
  color: lightgoldenrodyellow;
}
.project >>> blockquote {
  background-color: #f5f5f54f;
  padding: 1px 10px;
  border-left: 5px solid gainsboro;
}
.project >>> blockquote:hover {
  border-left: 5px solid lightgrey;
}
@media only screen and (max-width: 600px) {
  .project {
    width: 95vw;
  }
}
</style>
