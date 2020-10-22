<template>
  <div>
    <TriangleIcon
      v-if="!bar"
      :class="`toggle ${right && 'toggle-right'}`"
      :fill="hovered !== 'toggle' ? '#eaf2ff' : '#5f5f5f'"
      :transform="transformToggle"
      :transform-origin="!isOpen && 'center'"
      @mouseover="hovered = 'toggle'"
      @mouseleave="hovered = ''"
      @click="isOpen = !isOpen"
    />
    <transition :name="right ? 'slide-open-right' : 'slide-open-left'">
      <div v-if="isOpen" :class="`tab-of-con ${tabOfConClass}`">
        <div v-if="!bar" class="top-row">
          <TriangleIcon
            :class="`flip ${right ? 'flip-left' : 'flip-right'}`"
            :fill="hovered !== 'flip' ? '#eaf2ff' : '#5f5f5f'"
            :transform="transformFlip"
            @mouseover="hovered = 'flip'"
            @mouseleave="hovered = ''"
            @click="flipIt"
          />
          <div class="bar-option" @click="barOption"></div>
        </div>
        <div v-else>
          <TriangleIcon
            class="flip flip-left"
            :fill="hovered !== 'flip-left' ? '#eaf2ff' : '#5f5f5f'"
            transform="scale(1.5,1.5)"
            @mouseover="hovered = 'flip-left'"
            @mouseleave="hovered = ''"
            @click="flipRight(false)"
          />
          <TriangleIcon
            class="flip flip-right clear-edge"
            :fill="hovered !== 'flip-right' ? '#eaf2ff' : '#5f5f5f'"
            transform="scale(-1.5,1.5)"
            @mouseover="hovered = 'flip-right'"
            @mouseleave="hovered = ''"
            @click="flipRight(true)"
          />
        </div>
        <ul :class="`${bar && 'row-list'}`">
          <div
            class="navlink"
            @mouseover="hovered = 'me'"
            @mouseleave="hovered = ''"
          >
            <router-link :style="!bar && 'flex-direction:row;'" to="/">
              <MeIcon v-if="hovered !== 'me'" fill="#eaf2ff" />
              <MeUpIcon v-if="hovered === 'me'" fill="#5f5f5f" />
              <span :class="`${bar && 'icon-label'}`">Jason Leo</span>
            </router-link>
          </div>
          <div
            class="navlink"
            @mouseover="hovered = 'about'"
            @mouseleave="hovered = ''"
          >
            <router-link :style="!bar && 'flex-direction:row;'" to="/about">
              <StarIcon :fill="hovered !== 'about' ? '#eaf2ff' : '#5f5f5f'" />
              <span :class="`${bar && 'icon-label'}`">About</span>
            </router-link>
          </div>
          <div
            class="navlink"
            @mouseover="hovered = 'blog'"
            @mouseleave="hovered = ''"
          >
            <router-link :style="!bar && 'flex-direction:row;'" to="/blog">
              <BlogIcon :fill="hovered !== 'blog' ? '#eaf2ff' : '#5f5f5f'" />
              <span :class="`${bar && 'icon-label'}`">Blog</span>
            </router-link>
          </div>
          <div
            class="navlink"
            @mouseover="hovered = 'contact'"
            @mouseleave="hovered = ''"
          >
            <router-link :style="!bar && 'flex-direction:row;'" to="/contact">
              <ContactIcon
                :fill="hovered !== 'contact' ? '#eaf2ff' : '#5f5f5f'"
              />
              <span :class="`${bar && 'icon-label'}`">Contact</span>
            </router-link>
          </div>
          <div
            class="navlink"
            @mouseover="hovered = 'hello'"
            @mouseleave="hovered = ''"
            @click="hiFive"
          >
            <a :style="!bar && 'flex-direction:row;'" href="#">
              <HelloIcon :fill="hovered !== 'hello' ? '#eaf2ff' : '#5f5f5f'" />
              <span :class="`${bar && 'icon-label'}`">Hi</span>
            </a>
          </div>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import HelloIcon from "../assets/hand.svg"
import ContactIcon from "../assets/card-account-mail.svg"
import BlogIcon from "../assets/drawing-box.svg"
import MeUpIcon from "../assets/human.svg"
import MeIcon from "../assets/human-male.svg"
import StarIcon from "../assets/star-outline.svg"
import TriangleIcon from "../assets/triangle.svg"
export default {
  components: {
    HelloIcon,
    ContactIcon,
    BlogIcon,
    MeIcon,
    MeUpIcon,
    TriangleIcon,
    StarIcon,
  },
  props: {
    open: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data: function () {
    return {
      isOpen: false,
      hovered: "",
      right: false,
      bar: false,
    }
  },
  computed: {
    transformToggle() {
      if (this.right) {
        return !this.isOpen ? "scale(1,-1)" : "scale(-1,1)"
      } else {
        return !this.isOpen && "scale(-1,-1)"
      }
    },
    transformFlip() {
      return this.right ? "scale(1.5,1.5)" : "scale(-1.5,1.5)"
    },
    tabOfConClass() {
      if (this.bar) return "tab-of-con-bar"
      return this.right ? "tab-of-con-right" : "tab-of-con-left"
    },
  },
  beforeMount() {
    if (this.open) {
      this.isOpen = true
    }
  },
  methods: {
    hiFive() {
      alert("hi five")
    },
    flipIt() {
      this.right = !this.right
    },
    barOption() {
      this.bar = !this.bar
    },
    flipRight(right) {
      this.bar = false
      this.right = right
    },
  },
}
</script>

<style lang="postcss" scoped>
.slide-open-right-enter-active,
.slide-open-right-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-open-right-enter,
.slide-open-right-leave-to {
  transform: translateX(300px) translateY(-300px);
}
.slide-open-left-enter-active,
.slide-open-left-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-open-left-enter,
.slide-open-left-leave-to {
  transform: translateX(-300px) translateY(-300px);
}
.tab-of-con {
  position: fixed;
  min-width: 140px;
  background: linear-gradient(to left top, #60afb4, #e4b4d5);
  padding: 0px 20px 0px 0px;
  z-index: 2;
}
.tab-of-con-right {
  right: 0;
  box-shadow: 25px -25px 25px 40px #bbd6ff;
  border-radius: 0px 0px 0px 10px;
}
.tab-of-con-left {
  left: 0;
  box-shadow: -25px -25px 25px 40px #bbd6ff;
  border-radius: 0px 0px 10px 0px;
}
.tab-of-con-bar {
  left: 0;
  width: 100%;
}
.row-list {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}
.tab-of-con div.navlink a {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  color: #eaf2ff;
  padding: 3px 0px;
  white-space: nowrap;
}
.tab-of-con div.navlink a:hover {
  color: #5f5f5f;
}
.tab-of-con div.navlink a svg {
  margin-right: 0.5em;
}
.flip {
  cursor: pointer;
  position: absolute;
  z-index: 2;
}
.top-row {
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.bar-option {
  width: 15px;
  height: 10px;
  border-bottom: 3px solid #eaf2ff;
  cursor: pointer;
}
.bar-option:hover {
  width: 15px;
  height: 10px;
  border-bottom: 3px solid #5f5f5f;
  cursor: pointer;
}
.flip-left {
  top: 0.3rem;
  left: 0.3rem;
}
.flip-right {
  top: 0.3rem;
  right: 0.3rem;
}
.clear-edge {
  right: 1.7rem;
}
.toggle {
  cursor: pointer;
  position: fixed;
  left: 7px;
  top: 10px;
  z-index: 3;
}
.toggle-right {
  left: auto;
  right: 7px;
}
@media only screen and (max-width: 800px) {
  .tab-of-con div.navlink a {
    flex-direction: column;
  }
}
@media only screen and (max-width: 480px) {
  .tab-of-con div.navlink a {
    flex-direction: row;
  }
  .icon-label {
    display: none;
  }
}
</style>
