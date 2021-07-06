<template>
  <div class="gradient">
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
@import url("https://fonts.googleapis.com/css2?family=Montserrat&family=Sansita+Swashed:wght@300&family=Thasadith:wght@700&display=swap");
@import url("https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.0.1/styles/base16/espresso.min.css");
html,
body {
  margin: 0;
  color: #202020;
}
html,
body,
h1,
h2 {
  font-family: "Thasadith", sans-serif;
}
p,
h4,
h5 {
  font-family: "Montserrat", sans-serif;
}
h3 {
  font-family: "Sansita Swashed", cursive;
}
.content {
  padding-top: 3em;
}
.gradient {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 100vw;
  min-height: 100vh;
  background: linear-gradient(to right top, #147b83, #e485c7);
}
</style>
