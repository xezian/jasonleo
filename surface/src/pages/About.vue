<template>
  <div class="everything">
    <div class="center-content">
      <div class="row-nav">
        <a href="#accomplishments">Professional Accomplishments</a>
        <a href="#technologies">Technologies and Experience</a>
        <a href="#off-sprint">Off Sprint</a>
        <a href="#side-projects">Side Projects</a>
        <a href="#side-work">Side Work</a>
      </div>
      <div class="about">
        <VueShowdown
          v-if="about"
          :markdown="about"
          :extensions="[showdownHighlight]"
        />
      </div>
    </div>
    <div class="center-content">
      <div v-if="!oneProject" class="center-content">
        <h1 id="side-projects">Side Projects</h1>
        <div class="project-list">
          <div
            v-for="listing in sideProjects"
            :key="listing.slug"
            class="listing"
            @click="handleClickProject(listing.slug)"
          >
            <h2>{{ listing.title }}</h2>
            <p class="describe">{{ listing.description }}</p>
            <img
              :href="`https://jason-leo.s3.amazonaws.com/blog/images/${listing.cover}`"
            />
          </div>
        </div>
        <h1 id="side-work">Side Work</h1>
        <div class="project-list">
          <div
            v-for="listing in sideWork"
            :key="listing.slug"
            class="listing"
            @click="handleClickProject(listing.slug)"
          >
            <h2>{{ listing.title }}</h2>
            <p class="describe">{{ listing.description }}</p>
            <img
              :href="`https://jason-leo.s3.amazonaws.com/blog/images/${listing.cover}`"
            />
          </div>
        </div>
      </div>
      <div v-else class="project">
        <div class="back-up back-up-top" @click="backUp">&#171;</div>
        <VueShowdown :markdown="project" :extensions="[showdownHighlight]" />
        <div class="back-up back-up-bottom" @click="backUp">&#171;</div>
      </div>
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
      about: null,
    }
  },
  computed: {
    sideProjects() {
      return this.projects.filter((project) => {
        return project.tags.includes("side-project")
      })
    },
    sideWork() {
      return this.projects.filter((project) => {
        return project.tags.includes("side-work")
      })
    },
  },
  watch: {
    "$route.params"(newVal) {
      this.loadProjectOrProjects(newVal)
    },
  },
  beforeMount() {
    this.loadProjectOrProjects(this.$route.params)
    this.getAbout()
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
    getAbout() {
      this.$storage.get("about.md").then(async (md) => {
        this.about = await this.$storage.axios
          .get(md)
          .then((response) => {
            return response.data
          })
          .catch((err) => {
            console.error(err)
          })
      })
    },
    handleClickProject(slug) {
      this.$router.push(`/about/${slug}`)
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
      this.$router.push("/about")
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
.everything {
  padding-top: 5em;
}
.center-content {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.about {
  width: 70vw;
  padding: 2em;
}
.row-nav {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
.row-nav a {
  text-decoration: none;
  color: #f5f5f5;
}
.row-nav a:hover {
  text-decoration: none;
  color: #3f3f3f;
}
.project-list {
  width: 80vw;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 1rem;
  justify-items: center;
}
.listing {
  /* border: 1px solid black; */
  border-radius: 10px;
  width: calc(250px - 1rem);
  cursor: url("/brackets.ico"), auto;
  padding: 15px;
  margin: 10px 0;
  background: linear-gradient(to left top, #79cbd1, #b9b1e0);
  box-shadow: 0px 0px 100px 50px #df97ee8e;
}
.describe {
  margin: 10px -15px;
  padding: 10px 15px;
  background: linear-gradient(to right, #b99cb1, #87c1c5) fixed;
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
  .accomplishments {
    width: 95vw;
  }
}
</style>
