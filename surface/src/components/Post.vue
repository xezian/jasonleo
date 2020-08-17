<template>
  <div>
    <input v-model="title" type="text" /><br />
    <textarea v-model="content" type="textarea" /><br />
    <button @click="submit">Post</button>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      title: null,
      content: null,
    }
  },
  methods: {
    submit() {
      const [_error, response] = this.$api.post("/blog", {
        title: this.title,
        content: this.content,
      })
      if (response) {
        console.log(response)
      }
    },
  },
}
</script>
