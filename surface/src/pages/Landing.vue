<template>
  <div>
    <div ref="landing" class="landing-strip">
      <div class="background-gradient"></div>
      <div class="foreground-gradient"></div>
      <div ref="header" class="para section-header left">
        <h2>Hello, friends</h2>
        <h3>My name is Jason Leo</h3>
        <div class="right">
          <h4>I am a web developer</h4>
          <h5>Welcome to my website</h5>
        </div>
      </div>
      <div ref="circle" class="yellow circle"></div>
      <div ref="diamond" class="blue diamond"></div>
      <div ref="square" class="red square"></div>
      <p class="right para disclaimer">
        Please feel free to scroll around, click, input, observe, and inspect
        anything you like. I have tried to represent myself accurately in and
        around these pages while experimenting with frontend web development.
      </p>
      <div ref="body" class="section-body">
        <VueShowdown
          v-if="home"
          :markdown="home"
          :extensions="[showdownHighlight]"
        />
      </div>
      <h1 class="float-foot-edge">
        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
      </h1>
      <div class="end-page">
        <div
          class="personicon"
          @mouseover="hovered = true"
          @mouseleave="hovered = false"
          @click="goUp"
        >
          <MeUpIcon v-if="!hovered" fill="#5f5f5f" />
          <MeIcon v-if="hovered" fill="#eaf2ff" />
        </div>
        <h1>XXXXXXXXX</h1>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash"
import showdownHighlight from "showdown-highlight"
import MeUpIcon from "../assets/human.svg"
import MeIcon from "../assets/human-male.svg"
export default {
  components: {
    MeUpIcon,
    MeIcon,
  },
  data() {
    return {
      scrollY: 0,
      circleTop: 5,
      diamondTop: 700,
      squareTop: 1000,
      bodyTop: window.innerHeight + 300,
      headerOpacity: 1,
      hovered: false,
      home: null,
      showdownHighlight,
    }
  },
  created() {
    window.scrollTo(0, 0)
    window.addEventListener("scroll", this.handleScroll)
  },
  beforeMount() {
    this.getHome()
  },
  mounted() {
    this.$refs.header.style.opacity = this.headerOpacity
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.handleEither()
      this.scrollY = window.scrollY
    },
    handleEither() {
      const { circle, square, diamond, body, header } = this.$refs
      circle.style.width = `${this.scrollY + 150}px`
      circle.style.height = `${this.scrollY + 150}px`
      if (this.scrollY > 200) {
        diamond.style.height = `${this.scrollY + 250}px`
        diamond.style.width = `${this.scrollY + 250}px`
      }
      if (this.scrollY > 400) {
        square.style.height = `${this.scrollY - 100}px`
        square.style.width = `${this.scrollY - 100}px`
      }
      const diamondTop = this.diamondTop - this.scrollY * 1.5
      const squareTop = this.squareTop - this.scrollY * 1.3
      const bodyTop = this.bodyTop - this.scrollY * 1.1
      const circleTop = this.circleTop + this.scrollY * 0.3
      circle.style.top = `${circleTop}px`
      diamond.style.top = `${diamondTop}px`
      square.style.top = `${squareTop}px`
      body.style.top = `${bodyTop}px`
      header.style.opacity = (400 - this.scrollY) / 400
    },
    goUp() {
      window.scrollTo({ top: 0, behavior: "smooth" })
    },
    async getHome() {
      this.home = await this.$storage.axios
        .get("/jason-leo/public/home.md")
        .then((response) => {
          return response.data
        })
        .catch((err) => {
          console.error(err)
        })
    },
  },
}
</script>
