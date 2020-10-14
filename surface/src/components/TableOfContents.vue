<template>
  <div>
    <TriangleIcon
      class="toggle"
      :fill="hovered !== 'toggle' ? '#eaf2ff' : '#5f5f5f'"
      :transform="!isOpen && 'scale (-1, 1)'"
      :transform-origin="!isOpen && 'center'"
      @mouseover="hovered = 'toggle'"
      @mouseleave="hovered = ''"
      @click="isOpen = !isOpen"
    />
    <div v-if="isOpen" class="tab-of-con">
      <ul>
        <div
          class="navlink"
          @mouseover="hovered = 'blog'"
          @mouseleave="hovered = ''"
        >
          <router-link to="/blog">
            <BlogIcon :fill="hovered !== 'blog' ? '#eaf2ff' : '#5f5f5f'" />
            Blog
          </router-link>
        </div>
        <div
          class="navlink"
          @mouseover="hovered = 'social'"
          @mouseleave="hovered = ''"
        >
          <router-link to="/social">
            <MeIcon v-if="hovered !== 'social'" fill="#eaf2ff" />
            <MeUpIcon v-if="hovered === 'social'" fill="#5f5f5f" />
            Social
          </router-link>
        </div>
        <div
          class="navlink"
          @mouseover="hovered = 'projects'"
          @mouseleave="hovered = ''"
        >
          <router-link to="/projects">
            <WorkIcon :fill="hovered !== 'projects' ? '#eaf2ff' : '#5f5f5f'" />
            Examples
          </router-link>
        </div>
        <div
          class="navlink"
          @mouseover="hovered = 'contact'"
          @mouseleave="hovered = ''"
        >
          <router-link to="/contact">
            <ContactIcon
              :fill="hovered !== 'contact' ? '#eaf2ff' : '#5f5f5f'"
            />
            Contact
          </router-link>
        </div>
        <div
          class="navlink"
          @mouseover="hovered = 'hello'"
          @mouseleave="hovered = ''"
        >
          <router-link to="/">
            <HelloIcon :fill="hovered !== 'hello' ? '#eaf2ff' : '#5f5f5f'" />
            Hello
          </router-link>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import HelloIcon from "../assets/hand.svg"
import ContactIcon from "../assets/card-account-mail.svg"
import WorkIcon from "../assets/iframe-outline.svg"
import BlogIcon from "../assets/drawing-box.svg"
import MeUpIcon from "../assets/human.svg"
import MeIcon from "../assets/human-male.svg"
import TriangleIcon from "../assets/triangle.svg"
export default {
  components: {
    HelloIcon,
    ContactIcon,
    WorkIcon,
    BlogIcon,
    MeIcon,
    MeUpIcon,
    TriangleIcon,
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
    }
  },
  beforeMount() {
    if (this.open) {
      this.isOpen = true
    }
  },
}
</script>

<style lang="postcss" scoped>
.tab-of-con {
  position: fixed;
  left: 0;
  min-width: 140px;
  background: linear-gradient(to left top, #60afb4, #e4b4d5);
  padding: 0px 20px 0px 0px;
  box-shadow: -25px -25px 25px 40px #bbd6ff;
  border-radius: 0px 0px 5px 0px;
  padding: 0px 20px 0px 0px;
  z-index: 2;
}
.tab-of-con div.navlink a {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  color: #eaf2ff;
  padding: 3px 0px;
}
.tab-of-con div.navlink a:hover {
  color: #5f5f5f;
}
.toggle {
  cursor: pointer;
  position: fixed;
  left: 7px;
  top: 10px;
  z-index: 3;
}
</style>
