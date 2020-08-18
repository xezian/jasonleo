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
      const formData = new FormData()
      formData.append("file", this.file)
      formData.append("title", this.title)
      formData.append("description", this.description)
      formData.append("date", new Date().toISOString().split("T")[0])
      const [_error, response] = await this.$api.post("/blog", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      if (response) {
        console.log(response)
      }
    },
    processFile(event) {
      this.file = event.target.files[0]
      console.log(this.file)
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
