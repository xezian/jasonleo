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
      <div class="center-content">
        <h1 id="side-projects">Side Projects</h1>
        <div class="project-list">
          <div
            v-for="listing in sideProjects"
            :key="listing.slug"
            class="listing"
            @click="handleClick(listing.slug)"
          >
            <h2>
              {{ listing.title }}
            </h2>
            <div class="icon-row">
              <div class="icon">
                <object
                  :data="`${$bucketUrl}/projects/images/${listing.cover}`"
                  type="image/svg+xml"
                />
              </div>
            </div>
            <p class="describe">{{ listing.description }}</p>
          </div>
        </div>
        <h1 id="side-work">Side Work</h1>
        <div class="project-list">
          <div
            v-for="listing in sideWork"
            :key="listing.slug"
            class="listing"
            @click="handleClick(listing.slug)"
          >
            <h2>
              {{ listing.title }}
            </h2>
            <div class="icon-row">
              <div class="icon">
                <object
                  :data="`${$bucketUrl}/projects/images/${listing.cover}`"
                  type="image/svg+xml"
                />
              </div>
            </div>
            <p class="describe">{{ listing.description }}</p>
          </div>
        </div>
      </div>
      <div v-if="project.length" class="project-container" @click="close">
        <div class="project">
          <div id="close" class="close" @click="close">&#10005;</div>
          <VueShowdown :markdown="project" :extensions="[showdownHighlight]" />
        </div>
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
      showdownHighlight,
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
  beforeMount() {
    this.getProjects()
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
    async getAbout() {
      this.about = await this.$storage.axios
        .get(`${this.$bucketUrl}/public/about.md`)
        .then((response) => {
          return response.data
        })
        .catch((err) => {
          console.error(err)
        })
    },
    handleClick(slug) {
      this.getProject(slug)
    },
    close(e) {
      if (e.target.id === "close") {
        this.project = ""
      } else {
        const classList = [
          ...e.target.classList,
          ...e.target.parentElement.classList,
          ...e.target.parentElement.parentElement.classList,
        ]
        if (!classList.includes("project")) {
          this.project = ""
        }
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
.close {
  z-index: 1;
  font-size: 17pt;
  cursor: pointer;
  color: #42baff;
  width: fit-content;
}
.close:hover {
  color: #fde830;
}
.close:active {
  color: #e877ff;
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
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  height: 85px;
  font-size: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-end;
  background: linear-gradient(to right, #ce79d1a4, #73a1dda9);
}
.row-nav a {
  text-decoration: none;
  color: #f5f5f5;
}
.row-nav a:hover {
  text-decoration: none;
  color: #3f3f3f;
}
.icon-row {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.icon {
  display: grid;
  place-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #f5f5f5;
  background-color: #f5f5f541;
}
.icon object {
  pointer-events: none;
}
.project-list {
  width: 80vw;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 1rem;
  justify-items: center;
}
.listing {
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
.project-container {
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
  background-color: #0000006c;
}
.project {
  padding: 2em;
  border-radius: 3px;
  max-height: 90vh;
  overflow: auto;
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
@media only screen and (max-width: 800px) {
  .row-nav {
    height: 103px;
    font-size: 0.9rem;
  }
}
@media only screen and (max-width: 640px) {
  .row-nav {
    height: 125px;
  }
}
@media only screen and (max-width: 600px) {
  .project {
    width: 95vw;
  }
  .accomplishments {
    width: 95vw;
  }
}
@media only screen and (max-width: 480px) {
  .row-nav {
    height: 100px;
    font-size: 0.8rem;
  }
}
</style>
