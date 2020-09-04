<template>
  <div class="post">
    <input v-model="title" placeholder="Title" type="text" /><br />
    <input v-model="description" placeholder="Description" type="text" /><br />
    <input type="file" @change="processFile($event)" /><br />
    <button @click="submit">Post</button>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      title: null,
      description: null,
      file: null,
    }
  },
  methods: {
    async submit() {
      const postData = {
        file: this.file,
        title: this.title,
        description: this.description,
        date: new Date().toISOString().split("T")[0],
      }
      this.$storage.postToBlog(postData)
    },
    processFile(event) {
      this.file = event.target.files[0]
    },
  },
}
</script>

<style lang="postcss" scoped>
.post {
  margin: 1.5em 8vw;
  padding: 1em;
  border: 0.5em solid black;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.post button {
  align-self: flex-end;
}
</style>
