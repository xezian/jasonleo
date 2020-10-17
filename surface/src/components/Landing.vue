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
          <h5>And this is my website</h5>
        </div>
      </div>
      <div ref="circle" class="yellow circle"></div>
      <div ref="diamond" class="blue diamond"></div>
      <div ref="square" class="red square"></div>
      <div ref="body" class="section section-body">
        <p class="right para">
          It is great my privilege to share with you this. Maybe today we will
          imagine the unimaginable.This is an exploration of the wilderness of
          world wide webcraft. Also a demonstration in as ambitious a way as I
          can aspire, of what I am doing with these neo-digital incantations.
          This spellcraft of a sort. These illusions of the liquid crystal
          dispay.
        </p>
        <div class="spacer"></div>
        <p class="left para">
          In these times, in this context, I feel fortunate. The long drawn
          breath of pause I reminded myself of, has come to settle, in a curve
          of light, beside my table. I invite this listening moment, to complete
          the consideration we meant to entertain. Where the end begins, the
          vision exact, the filter graduates, our home expands, and all our
          voices in unison advocate an unencumbered togetherness.
        </p>
        <div class="spacer"></div>
        <p class="right para">
          So with every one available, and these days as we connect via
          circumstance and cicuitry &mdash; where the circular vestibule of
          sudden refraction contracts &mdash; I invited these articulations, and
          embrace the ways we may in our fulfillment find true resolution in the
          vast untamed wilderness of ideals. Our closest hearted friendships,
          and our furthest flung notions, the cacauphony of it all, the din, the
          restless, the impenetrable darkness of an inward abyss. I invite you
          to join me, in a reimagining of future purposes, in an outpuring of
          exhuberent disambiguation, to the depth of our center, to the holder,
          to the dancer within us, towards becoming true.
        </p>
        <div class="spacer"></div>
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
      bodyTop: window.innerHeight,
      headerOpacity: 1,
      hovered: false,
    }
  },
  created() {
    window.scrollTo(0, 0)
    window.addEventListener("scroll", this.handleScroll)
  },
  mounted() {
    this.$refs.header.style.opacity = this.headerOpacity
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll)
  },
  methods: {
    handleScroll() {
      if (this.scrollY < window.scrollY) {
        this.handleDown()
      } else {
        this.handleUp()
      }
      this.handleEither()
      this.scrollY = window.scrollY
    },
    handleEither() {
      const { circle, square, diamond, body } = this.$refs
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
    },
    handleUp() {
      const { header } = this.$refs
      if (this.scrollY < 600 && header.style.opacity < 1) {
        this.headerOpacity = this.headerOpacity + 0.1
        header.style.opacity = this.headerOpacity
      }
    },
    handleDown() {
      const { header } = this.$refs
      if (header.style.opacity > 0) {
        this.headerOpacity = this.headerOpacity - 0.1
        header.style.opacity = this.headerOpacity
      }
    },
    goUp() {
      window.scrollTo({ top: 0, behavior: "smooth" })
    },
  },
}
</script>

<style lang="postcss" scoped>
.landing-strip {
  background: linear-gradient(to left bottom, #147b83, #e485c7);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 3200px;
  color: #f3f3f3;
  overflow: hidden;
}
.landing-strip div.end-page {
  z-index: 1;
  margin-top: auto;
  text-align: center;
}
.landing-strip h1.float-foot-edge {
  z-index: 1;
  position: fixed;
  bottom: 0;
}
.background-gradient {
  position: absolute;
  background: linear-gradient(to top, #e485c7, #147b83);
  width: 90%;
  height: 3200px;
}
.foreground-gradient {
  position: absolute;
  background: linear-gradient(to top, #147b83, #e485c7);
  width: 80%;
  height: 3200px;
}
.spacer {
  background: linear-gradient(to right, #81f2faa8, #d488bd98);
  height: 100px;
  width: 100vw;
  margin: 100px 0;
}
.section {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 10px;
}
.para {
  width: 50%;
}
.section-header {
  position: fixed;
  font-size: 2.5em;
}
.section-body {
  position: fixed;
  top: 100vh;
  font-size: 1.1rem;
  line-height: 2em;
  padding: 20px;
}
.circle {
  position: fixed;
  top: 5px;
  right: 6em;
  border-radius: 50%;
  width: 150px;
  height: 150px;
}
.diamond {
  position: fixed;
  transform: rotate(45deg);
  top: 700px;
  left: 6em;
  width: 450px;
  height: 450px;
}
.square {
  position: fixed;
  top: 1000px;
  right: 6em;
  width: 300px;
  height: 300px;
}
.blue {
  background-color: #90c9ff94;
}
.yellow {
  background-color: #f4ff9094;
}
.red {
  background-color: #ff909094;
}
.left {
  text-align: left;
}
.right {
  text-align: right;
}
.personicon {
  cursor: pointer;
}
@media only screen and (max-width: 600px) {
  .section {
    width: 75%;
  }
  .diamond {
    width: 450px;
  }
  .para {
    width: 99%;
  }
}
</style>
