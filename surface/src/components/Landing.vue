<template>
  <div>
    <div ref="landing" class="landing-strip">
      <div class="background-gradient"></div>
      <div class="foreground-gradient"></div>
      <div ref="header" class="section section-header left">
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
        <p class="right">
          It is great my privilege to share with you this. Maybe today we will
          imagine the unimaginable.This is an exploration of the wilderness of
          world wide webcraft. Also a demonstration in as ambitious a way as I
          can aspire, of what I am doing with these neo-digital incantations.
          This spellcraft of a sort. These illusions of the liquid crystal
          dispay.
        </p>
        <div class="spacer"></div>
        <p class="left">
          In these times, in this context, I feel fortunate. The long drawn
          breath of pause I reminded myself of, has come to settle, in a curve
          of light, beside my table. As long as I am able to stop looking, you
          are within reach.
        </p>
      </div>
      <h1 class="float-foot-edge">
        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
      </h1>
      <div class="end-page">
        <h1>XXXXXXXXX</h1>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash"
export default {
  data() {
    return {
      scrollY: 0,
      circleTop: 5,
      diamondTop: 700,
      squareTop: 1000,
      bodyTop: 1000,
      headerOpacity: 1,
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
    handleScroll: _.debounce(function () {
      if (this.scrollY < window.scrollY) {
        this.handleDown()
      } else {
        this.handleUp()
      }
      this.handleEither()
      this.scrollY = window.scrollY
    }),
    handleEither() {
      const { circle, square, diamond } = this.$refs
      circle.style.width = `${this.scrollY + 150}px`
      circle.style.height = `${this.scrollY + 150}px`
      if (this.scrollY > 700) {
        diamond.style.height = `${this.scrollY - 250}px`
        diamond.style.width = `${this.scrollY - 250}px`
      }
      if (this.scrollY > 1000) {
        square.style.height = `${this.scrollY - 700}px`
        square.style.width = `${this.scrollY - 700}px`
      }
    },
    handleUp() {
      const { circle, square, diamond, body, header } = this.$refs
      this.diamondTop = this.diamondTop + 25
      this.squareTop = this.squareTop + 10
      this.circleTop = this.circleTop - 5
      this.bodyTop = this.bodyTop + 25
      circle.style.top = `${this.circleTop}px`
      diamond.style.top = `${this.diamondTop}px`
      square.style.top = `${this.squareTop}px`
      body.style.top = `${this.bodyTop}px`
      if (this.scrollY < 600 && header.style.opacity < 1) {
        this.headerOpacity = this.headerOpacity + 0.1
        header.style.opacity = this.headerOpacity
      }
    },
    handleDown() {
      const { circle, square, diamond, body, header } = this.$refs
      this.diamondTop = this.diamondTop - 25
      this.squareTop = this.squareTop - 10
      this.circleTop = this.circleTop + 5
      this.bodyTop = this.bodyTop - 25
      circle.style.top = `${this.circleTop}px`
      diamond.style.top = `${this.diamondTop}px`
      square.style.top = `${this.squareTop}px`
      body.style.top = `${this.bodyTop}px`
      if (this.scrollY > 200 && header.style.opacity > 0) {
        this.headerOpacity = this.headerOpacity - 0.1
        header.style.opacity = this.headerOpacity
      }
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
  color: white;
  overflow: hidden;
}
.landing-strip div.end-page {
  z-index: 1;
  margin-top: auto;
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
  margin: 200px 0;
  background: linear-gradient(to right, #81f2faa8, #d488bd98);
  height: 100px;
  margin: 0;
}
.section {
  position: absolute;
  top: 10px;
  width: 50%;
}
.section-header {
  position: fixed;
  font-size: 2.5em;
}
.section-body {
  position: fixed;
  top: 1000px;
  font-size: 2rem;
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
@media only screen and (max-width: 600px) {
  .section {
    width: 75%;
  }
  .diamond {
    width: 450px;
  }
}
</style>
