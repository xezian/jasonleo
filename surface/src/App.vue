<template>
  <div class="wrapper">
    <TableOfContents :open="true" />
    <router-view />
  </div>
</template>

<script>
import TableOfContents from "./components/TableOfContents.vue"

export default {
  name: "App",
  components: {
    TableOfContents,
  },
}
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
}
.wrapper {
  min-width: 100vw;
  min-height: 100vh;
  background: linear-gradient(to right top, #147b83, #e485c7) fixed;
}
</style>
