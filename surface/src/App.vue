<template>
  <div>
    <TableOfContents :open="true" />
  </div>
</template>

<script>
import TableOfContents from "./components/TableOfContents.vue";

export default {
  name: "App",
  components: {
    TableOfContents,
  },
};
</script>

<style></style>
