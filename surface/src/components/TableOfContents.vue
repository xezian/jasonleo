<template>
  <div class="tab-of-con">
    <span class="toggle" @click="isOpen = !isOpen">{{ label }}</span>
    <div v-if="isOpen">
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
      return this.isOpen ? "hide" : "show"
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
  position: absolute;
}
</style>
