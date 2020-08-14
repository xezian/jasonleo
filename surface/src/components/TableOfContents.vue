<template>
  <div>
    <span class="toggle" @click="isOpen = !isOpen">{{ label }}</span>
    <div v-if="isOpen">
      <ul>
        <li>Hi</li>
        <li>I</li>
        <li>am</li>
        <li>Jason</li>
        <li>A.</li>
        <li>Leo</li>
        <li>,</li>
        <li>a</li>
        <li>web</li>
        <li>developer</li>
        <li>.</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      isOpen: false,
    };
  },
  props: {
    open: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    label() {
      return this.isOpen ? "hide" : "show";
    },
  },
  beforeMount() {
    if (this.open) {
      this.isOpen = true;
    }
  },
};
</script>
