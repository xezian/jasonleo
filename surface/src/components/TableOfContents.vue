<template>
  <div>
    <span class="toggle" @click="isOpen = !isOpen">{{ label }}</span>
    <div v-if="isOpen" class="tab-of-con">
      <ul>
        <router-link to="/blog">
          <li>Blog</li>
        </router-link>
        <router-link to="/projects">
          <li>Projects</li>
        </router-link>
        <router-link to="/contact">
          <li>Contact</li>
        </router-link>
        <router-link to="/">
          <li>Hi</li>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
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
    }
  },
  computed: {
    label() {
      return this.isOpen ? "<" : ">"
    },
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
  background: linear-gradient(to left top, #60afb4, #e4b4d5);
  padding: 0px 20px 0px 0px;
  box-shadow: 0px 0px 20px 3px #bbd6ff;
  border-radius: 0px 0px 5px 0px;
  padding: 0px 20px 0px 0px;
  z-index: 1;
}
.toggle {
  cursor: pointer;
  position: fixed;
  left: 3px;
  z-index: 2;
}
</style>
